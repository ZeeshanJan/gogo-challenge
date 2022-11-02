import { expect } from "chai";
import { ethers } from "hardhat";
//import { GogoStakingApp } from "../types";
import { ERRORS } from "./errors";
import { parseUnits } from "ethers/lib/utils";

import {
    addresses,
    freshSuite,
    owner,
    ownerAddress,
    GogoStakingContract,
    DevUSDCContract,
    user,
    userAddress,
    userTwo,
    userTwoAddress,
    userThree,
    userThreeAddress
  } from "./_setup.spec";

  let stakeValue;

freshSuite("GogoStaking - Staking user", () => {
    it("should stake minimum 5 ethers", async () => {

      stakeValue = parseUnits("4");

      await GogoStakingContract.deployed();
      await expect(GogoStakingContract.connect(user).stakeETH({value: stakeValue})).to.be.revertedWith(ERRORS.MINIMUM_DEPOSIT_REQUIRED);

      //await expect(GogoStakingContract.connect(user).stakeETH({value: stakeValue})).to.be.revertedWith("User has already staked.");

    });

    it("should not stake" , async () => {
      stakeValue = parseUnits("6");
      await GogoStakingContract.deployed();
      await GogoStakingContract.connect(user).stakeETH({value: stakeValue});

      await expect(GogoStakingContract.connect(user).stakeETH({value: stakeValue})).to.be.revertedWith(ERRORS.USER_ALREADY_STAKED);
    });

    it("user not a staker", async () => {

      stakeValue = parseUnits("6");
      await GogoStakingContract.deployed();
      await expect(GogoStakingContract.connect(user).unstakeETH()).to.be.revertedWith(ERRORS.USER_NOT_STAKER);

    });

    it("should unstake eth and claim rewards", async () => {
      stakeValue = parseUnits("50");
      await GogoStakingContract.deployed();
      await GogoStakingContract.connect(user).stakeETH({value: stakeValue});

      stakeValue = parseUnits("75");
      await GogoStakingContract.connect(userTwo).stakeETH({value: stakeValue});


      const devUSDCBalanceBeforeClaimUserOne = await DevUSDCContract.balanceOf(userAddress);
      const devUSDCBalanceBeforeClaimUserTwo = await DevUSDCContract.balanceOf(userTwoAddress);

      const twoDaysInSeconds = 60 * 60 * 48;
      await increaseEvmTime(twoDaysInSeconds);

      await GogoStakingContract.connect(user).unstakeETH();
      await GogoStakingContract.connect(userTwo).unstakeETH();

      const devUSDCBalanceAfterClaimUserOne = await DevUSDCContract.balanceOf(userAddress);
      const devUSDCBalanceAfterClaimUserTwo = await DevUSDCContract.balanceOf(userTwoAddress);

      expect(devUSDCBalanceAfterClaimUserOne).to.be.gt(devUSDCBalanceBeforeClaimUserOne);
      expect(devUSDCBalanceAfterClaimUserTwo).to.be.gt(devUSDCBalanceBeforeClaimUserTwo);


    });
});

async function increaseEvmTime(seconds: number) {
  await ethers.provider.send("evm_increaseTime", [seconds]);
  await ethers.provider.send("evm_mine", []);
}