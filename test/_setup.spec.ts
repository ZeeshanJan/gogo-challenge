import {
    GogoStakingApp,
    GogoStakingApp__factory,
    DevUSDC,
    DevUSDC__factory,
    
  } from "../types";
  import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
  import { parseUnits } from "ethers/lib/utils";
  import hre, { ethers } from "hardhat";
  import { use } from "chai";
  import { solidity } from "ethereum-waffle";
  import { Suite } from "mocha";
  
  use(solidity);
  
  export let GogoStakingContract: GogoStakingApp;
  export let DevUSDCContract: DevUSDC;
  
  export let addresses: SignerWithAddress[];
  export let owner: SignerWithAddress;
  export let ownerAddress: string;
  export let user: SignerWithAddress;
  export let userAddress: string;
  export let userTwo: SignerWithAddress;
  export let userTwoAddress: string;
  export let userThree: SignerWithAddress;
  export let userThreeAddress: string;
  
  export function freshSuite(name: string, tests: () => void) {
    describe(name, () => {
      beforeEach(async function () {
        await takeSnapshot();
      });
      tests();
      afterEach(async function () {
        await revertToSnapshot();
      });
    });
  }
  
  before(async () => {
    beforeEach(async () => {
      addresses = await ethers.getSigners();
  
      owner = addresses[0];
      ownerAddress = await owner.getAddress();
      user = addresses[1];
      userAddress = await user.getAddress();
      userTwo = addresses[2];
      userTwoAddress = await userTwo.getAddress();
      userThree = addresses[3];
      userThreeAddress = await userThree.getAddress();
  
      GogoStakingContract = await new GogoStakingApp__factory(owner).deploy();
      DevUSDCContract = await new DevUSDC__factory(owner).deploy();
     
      const setDevUSDCTx = await GogoStakingContract.setDevUSDCAddress(DevUSDCContract.address);
      await setDevUSDCTx.wait();

      const setGogoStakingAppAsMinterTx = await DevUSDCContract.addMinter(GogoStakingContract.address);
      await setGogoStakingAppAsMinterTx.wait();

    });
  });

  let snapshotId: string = "0x1";

  async function takeSnapshot() {
    snapshotId = await hre.ethers.provider.send("evm_snapshot", []);
  }
  async function revertToSnapshot() {
    await hre.ethers.provider.send("evm_revert", [snapshotId]);
  }