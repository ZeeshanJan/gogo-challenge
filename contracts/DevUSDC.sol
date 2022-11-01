// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "hardhat/console.sol";

/**
 * @title DevUSDC (ERC20 Tokens)
 * @author Zeeshan Jan
 * @notice This contract manages the DevUSDC tokens.
 */

/// @custom:security-contact https://zeeshan.uk

contract DevUSDC is ERC20, Ownable, Pausable, AccessControl {

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    /// Total number of devUSDC tokens to be minted
    uint256 public devUSDCSupply;

    /// Total number of devUSDC minted
    uint256 public devUSDCSupplyCounter;

    event DevUSDCMinted(address user, uint256 devUSDC);

    event WithdrawBalance(uint256 balance);

    constructor() ERC20("devUSDC", "$devUSDC") {
        _setRoleAdmin(MINTER_ROLE, DEFAULT_ADMIN_ROLE);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);

        /// Ten Billion DevUSDC tokens
        devUSDCSupply = 10000000000 * 10 ** decimals();
        devUSDCSupplyCounter = 0;
        
    }

    /**
     * @notice Adds an account as a minter that can perform onlyMinter functions.
     * @param account is an address of a new Minter.
     */
    function addMinter(address account) public virtual onlyOwner {
        grantRole(MINTER_ROLE, account);
    }

    /**
     * @notice Removes an account as a minter.
     * @param account is an address of the minter to be removed.
     */
    function removeMinter(address account) public virtual onlyOwner {
        revokeRole(MINTER_ROLE, account);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyMinter {
        if (devUSDCSupplyCounter >= devUSDCSupply) revert ("Minting limit reached");
        if ((devUSDCSupplyCounter + amount) > devUSDCSupply) revert ("NotEnoughMintSupplyAvailable");
        devUSDCSupplyCounter += amount;
        _mint(to, amount);
        emit DevUSDCMinted(to, amount);
    }
    
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, amount);
    }
    modifier onlyMinter() {
        if(isMinter(msg.sender) == false) revert ("NotAMinter");
        _;
    }
    
    function isMinter(address account) public virtual view returns (bool) {
        return hasRole(MINTER_ROLE, account);
    }

    /**
    * @notice allows owner to withdraw funds from minting
    */
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);

        emit WithdrawBalance(address(this).balance);
    }
}