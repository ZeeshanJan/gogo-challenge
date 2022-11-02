import { ethers } from "hardhat";

async function main() {
    console.log('Entering into deployment...');
  await deployGogoStakingApp();
  await deployDevUSDC();
}

export async function deployGogoStakingApp() {
  const GogoStakingApp = await ethers.getContractFactory("GogoStakingApp");
  const gogoStaking = await GogoStakingApp.deploy();
  await gogoStaking.deployed();
  console.log("GogoStakingApp deployed to: ", gogoStaking.address);
}

export async function deployDevUSDC() {
    const DevUSDC = await ethers.getContractFactory("DevUSDC");
    const devUSDC = await DevUSDC.deploy();
    await devUSDC.deployed();
    console.log("DevUSDC deployed to: ", devUSDC.address);
  }

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });