// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "hardhat/console.sol";
import "./GogoLibrary.sol";
import "./DevUSDC.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";


/**
 * @title GogoStakingApp (Challenge)
 * @author Zeeshan Jan
 * @notice This contract manages the ETH staking mechanics.
 */

/// @custom:security-contact https://zeeshan.uk
contract GogoStakingApp is Ownable {
    
    /// Reference address for devUSDC
    address public devAddress;

    /// Instance of devUSDC
    DevUSDC devUSDC;

    /// Instance of Chainlink price oracle
    AggregatorV3Interface internal priceFeed;

    /// Staking information of users
    mapping(address => GogoLibrary.GogoStaker) userStakes;

    /// Minimum limit of ETH for staking
    uint256 stakingLimit;

    /// Price of ETH
    uint256 ethPrice;

    /// The APR percentage (in this case 10%)
    uint256 rewardAPR;

    /// The number of devUSDC as a reward for a specific duration (1 days)
    uint256 public rewardDuration;
    
    constructor() {

        stakingLimit = 5 ether;
        ethPrice = 1500; //temporary (for testing purpose)
        rewardAPR = 10; // APR of 10%
        rewardDuration = 1 days;
        /**
        * Network: Goerli
        * Aggregator: ETH/USD
        * Address: 0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e
        */

        //priceFeed = AggregatorV3Interface(0x0715A7794a1dc8e42615F059dD6e406A6594651A); // Polygon Testnet (Mumbai)
        priceFeed = AggregatorV3Interface(0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e); // Goerli Testnet


    }

    /**
     * @notice Sets the reference address of DevUSDC.sol 
     * @param devUSDCAddress is an address of the deployed contract of AlienUnderdogs.sol
     */
    function setDevUSDCAddress(address devUSDCAddress) public onlyOwner {
        devAddress = devUSDCAddress;
        devUSDC = DevUSDC(devAddress);
    }

    /**
     * @notice Stakes the amount of ETH into the vault. Minimum amount required to be put on staking is 5 ETH.
     */

    function stakeETH() payable public {
        /// Minimum 5 ETH are required
        require (msg.value >= stakingLimit, "Minimum deposit 5 ETH required");

        GogoLibrary.GogoStaker storage staker = userStakes[msg.sender];
        require(staker.staked == false, "User has already staked.");

        staker.staked = true;
        staker.stakedAmount = msg.value;
        staker.stakerAddress = msg.sender;
        staker.stakedSince = block.timestamp;
        userStakes[msg.sender] = staker;

    }

    /**
     * @notice UnStakes the amount of ETH from the vault to msg.sender.
     */

    function unstakeETH() public {
        GogoLibrary.GogoStaker storage staker = userStakes[msg.sender];
        require(staker.staked == true, "User has not staked.");

        /// Calculates the compound interest in terms of ETH, and mints its equivalance in devUDSC
        calculateDevUSDCRwards(msg.sender);
        
        /// returns the original staked ETH to its owner
        (bool success,)= payable(msg.sender).call{value:staker.stakedAmount}("");
        require(success, "Transfer failed!");

        /// resets the user information
        staker.staked = false;
        staker.stakedAmount = 0;
        staker.stakedSince=0;
        userStakes[msg.sender] = staker;


    }

    /**
     * @notice Gets the staking information of a user. It returns the data struct of GogoLibrary.GogoStaker
     * @param stakerAddress is an address of a user who has staked their ETH.
     * @return stakerInfo is the data struct represented by GogoLibrary.GogoStaker.
    */

    function getStakingInfo(address stakerAddress) public view returns (GogoLibrary.GogoStaker memory stakerInfo){
        GogoLibrary.GogoStaker memory staker = userStakes[stakerAddress];

        /// Check if the user has staked their ETH or not
        require(staker.staked == true, "User has not staked.");

        /// Returns the staker information
        stakerInfo = staker;

    }


    /**
     * @notice Calculates the devUSDC amount required to be minted
     * @param stakerAddress is an address of a user who has staked their ETH, and unstaking now.
    */

    function calculateDevUSDCRwards(address stakerAddress) internal {
        GogoLibrary.GogoStaker memory staker = userStakes[stakerAddress];

        require(staker.staked == true, "User has not staked.");
        
        /// Calculates the compound interest of the user's stakes
        uint256 earnedRewards = calculateCompound(stakerAddress);

        /// Fetches the ETH's latest price from Chainlink price oracle
        //ethPrice = getLatestPrice()/1e8;
        //console.log("USDT Rewards: ", getLatestPrice() * earnedRewards);

        /// Mints devUSDC's equivalent to the price of compound interest
        devUSDC.mint(stakerAddress, (ethPrice * earnedRewards));
        
    }

    /**
     * @notice Calculates the Compound interest on staked ETH
     * @param stakerAddress is an address of a user who has staked their ETH.
     */
    function calculateCompound(address stakerAddress) public view returns (uint256 earnedRewards){
        GogoLibrary.GogoStaker memory staker = userStakes[stakerAddress];
        require(staker.staked == true, "User has not staked.");

        /// The duration in seconds from now to the time when the user had put their ETH on staking
        uint256 duration = block.timestamp - staker.stakedSince;

        /// compoundAmount is used to store the compounded ETH
        uint256 compoundAmount = staker.stakedAmount;

        /// calculatedAPR is used to set the APR percentage (i.e., 10%)
        uint256 calculatedAPR = ((rewardAPR * 1e18 ) / 100 );

        //console.log("APR: ", calculatedAPR);
        
        /// to find out APR per day
        calculatedAPR = calculatedAPR / (365 days); // * 24 * 60 * 60); //31536000;
        
//        console.log("APR per day ", calculatedAPR);

        /// Calculate the compound ETH per day
        for (uint i = 0; i<= duration; i=i+rewardDuration) {
            compoundAmount +=  calculateAPR(compoundAmount);
        }
        
        //console.log("Staked Amount: ", staker.stakedAmount);
        //console.log("Compound Amount: ", compoundAmount);
        //console.log("Duration: ", duration);

        /// earnedRewards is the compounded interest in terms of ETH.
        earnedRewards = compoundAmount - staker.stakedAmount;
        //console.log("Rewards: ", earnedRewards);

    }


    /**
    * @notice Calculates the APR of ETH, and returns the 10% of the amount of ETH
    * @param compoundETH is the amount ETH.
    * @return compoundAPR is the compounded APR of ETH
    */
    function calculateAPR (uint256 compoundETH) internal view returns (uint256 compoundAPR){

        uint256 calculatedAPR = (compoundETH + (rewardAPR * 1e18 ) / 100 );
        compoundAPR = calculatedAPR / (365 days); //(365 * 24 * 60 * 60); //31536000;
        //console.log("Compound ETH: ", compoundAPR);

    }

    /**
    * @notice Fetches the price of ETH from Chainlink price oracle
    * @return uint256 is the price of ETH 
    */
    function getLatestPrice() public view returns (uint256) {
        (
            /*uint80 roundID*/,
            int256 price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = priceFeed.latestRoundData();
        //console.logInt(price);
        return uint256(price);
    }


}