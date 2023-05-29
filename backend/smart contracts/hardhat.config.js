require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("@nomicfoundation/hardhat-verify");

const {
  ALCHEMY_MUMBAI_API_URL,
  PRIVATE_KEY_ACCOUNT1,
  POLYGONSCAN_API_KEY,
} = process.env;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.18",
  paths: {
    artifacts: './artifacts',
  },
  networks: {
    mumbai: {
      url: ALCHEMY_MUMBAI_API_URL,
      accounts: [PRIVATE_KEY_ACCOUNT1],
    },
  },
  etherscan: {
    apiKey: POLYGONSCAN_API_KEY,
  },
};
