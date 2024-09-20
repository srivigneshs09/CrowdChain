/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.17",
    defaultNetwork: 'Sepolia',
    networks: {
      hardhat: {},
      Sepolia: {
        url: 'https://eth-sepolia.public.blastapi.io',
        accounts:[`0x${process.env.PRIVATE_KEY}`]
      }
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
