// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

/**
 * @title GogoLibrary (Library)
 * @author Zeeshan Jan
 */

 library GogoLibrary {
    struct GogoStaker {
        bool staked;
        address stakerAddress;
        uint256 stakedAmount;
        uint256 stakedSince;
    }


    struct Stake {
        bool status;
        uint256 apartment;
        uint256 since;
        uint256 ratePerDay;
    }

   
}