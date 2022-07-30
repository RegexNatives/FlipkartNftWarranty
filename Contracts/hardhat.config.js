require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "matic",
  networks: {
    hardhat: {},
    mumbai: {
      url: process.env.PRIVATE_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  solidity: "0.8.9",
};
