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

    DevUSDC devUSDC;

    AggregatorV3Interface internal priceFeed;

    /// Staking information of users
    mapping(address => GogoLibrary.GogoStaker) userStakes;

    uint256 stakingLimit;

    uint256 ethPrice;

    uint256 rewardAPR;

    /// The number of devUSDC as a reward for a specific duration (1 years)
    uint256 public rewardDuration;
    
    constructor() {

        stakingLimit = 5 ether;
        ethPrice = 1500; //temporary
        rewardAPR = 10; // APR of 10%
        rewardDuration = 1 days;

        priceFeed = AggregatorV3Interface(0x0715A7794a1dc8e42615F059dD6e406A6594651A); // Mumbai Polygon Testnet

    }

    /**
     * @notice Sets the reference address of DevUSDC.sol 
     * @param devUSDCAddress is an address of the deployed contract of AlienUnderdogs.sol
     */
    function setDevUSDCAddress(address devUSDCAddress) public onlyOwner {
        devAddress = devUSDCAddress;
        devUSDC = DevUSDC(devAddress);
    }

    function stakeETH() payable public {
        require (msg.value >= stakingLimit, "Minimum deposit 5 ETH required");

        GogoLibrary.GogoStaker storage staker = userStakes[msg.sender];

        staker.staked = true;
        staker.stakedAmount = msg.value;
        staker.stakerAddress = msg.sender;
        staker.stakedSince = block.timestamp;
        userStakes[msg.sender] = staker;

    }

    function unstakeETH() public {
        GogoLibrary.GogoStaker storage staker = userStakes[msg.sender];
        require(staker.staked == true, "User has not staked.");


        calculateDevUSDCRwards(msg.sender);
        
        (bool success,)= payable(msg.sender).call{value:staker.stakedAmount}("");
        require(success, "Transfer failed!");
        staker.staked = false;
        staker.stakedAmount = 0;
        staker.stakedSince=0;
        userStakes[msg.sender] = staker;


    }

    function getStakingInfo(address stakerAddress) public view returns (GogoLibrary.GogoStaker memory stakerInfo){
        GogoLibrary.GogoStaker memory staker = userStakes[stakerAddress];

        require(staker.staked == true, "User has not staked.");

        stakerInfo = staker;

    }

    function calculateDevUSDCRwards(address stakerAddress) internal {
        GogoLibrary.GogoStaker memory staker = userStakes[stakerAddress];

        require(staker.staked == true, "User has not staked.");
        
        uint256 earnedRewards = calculateCompound(stakerAddress);

        //ethPrice = getLatestPrice();
        //console.log("USDT Rewards: ", getLatestPrice() * earnedRewards);

        devUSDC.mint(stakerAddress, ((getLatestPrice()/1e8) * earnedRewards));
        
    }

    function calculateCompound(address stakerAddress) public view returns (uint256 earnedRewards){
        GogoLibrary.GogoStaker memory staker = userStakes[stakerAddress];
        require(staker.staked == true, "User has not staked.");
        uint256 duration;
        uint256 compoundAmount = staker.stakedAmount;
        uint256 calculatedAPR = ((rewardAPR * 1e18 ) / 100 );

        duration = block.timestamp - staker.stakedSince;

        console.log("APR: ", calculatedAPR);

        calculatedAPR = calculatedAPR / (365); // * 24 * 60 * 60); //31536000;
        
        console.log("APR per second ", calculatedAPR);

        for (uint i = 0; i<= duration; i=i+86400) {
            compoundAmount +=  calculateAPR(compoundAmount);
        }
        
        console.log("Staked Amount: ", staker.stakedAmount);
        console.log("Compound Amount: ", compoundAmount);
        console.log("Duration: ", duration);

        earnedRewards = compoundAmount - staker.stakedAmount;
        console.log("Rewards: ", earnedRewards);

    }

    function calculateAPR (uint256 compoundETH) internal view returns (uint256 compoundAPR){

        uint256 calculatedAPR = (compoundETH + (rewardAPR * 1e18 ) / 100 );
        compoundAPR = calculatedAPR / (365 * 24 * 60 * 60); //31536000;
        console.log("Compound ETH: ", compoundAPR);

    }
    function getLatestPrice() public view returns (uint256) {
        (
            /*uint80 roundID*/,
            int256 price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = priceFeed.latestRoundData();
        console.logInt(price);
        return uint256(price);
    }


}