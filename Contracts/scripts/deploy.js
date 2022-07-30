const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log("Deploying contracts with account: ", deployer.address);
  console.log("Account balance: ", accountBalance.toString());

  const warrantyContractFactory = await hre.ethers.getContractFactory(
    "Warranty"
  );
  const warrantyContract = await warrantyContractFactory.deploy();
  await warrantyContract.deployed();

  console.log("warrantyContract address: ", warrantyContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
