import { expect } from "chai";
import { ethers } from "hardhat";
import { GogoStakingApp } from "../types";
import { parseUnits } from "ethers/lib/utils";

import {
    addresses,
    freshSuite,
    owner,
    ownerAddress,
    GogoStakingContract,
    user,
    userAddress,
    userTwo,
    userTwoAddress,
    userThree,
    userThreeAddress
  } from "./_setup.spec";

  let stakeValue = parseUnits("5");

freshSuite("GogoStaking - Staking user", () => {

    it("should stake minimum 5 ethers", async () => {

      const stakingInfo = await GogoStakingContract.connect(user).stakeETH({value: stakeValue});

      await expect(stakingInfo).to.be.revertedWith("Minimum deposit 5 ETH required");

    });
});