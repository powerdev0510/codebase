const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  JWT_KEY: process.env.JWT_KEY,
  DB_URL: process.env.DB_URL,
  PINATA_API_KEY: process.env.PINATA_API_KEY,
  PINATA_API_SECRET: process.env.PINATA_API_SECRET,
  PINATA_GATEWAY: process.env.PINATA_GATEWAY,
  TESTNET_RPC: process.env.TESTNET_RPC,
  MAINNET_RPC: process.env.MAINNET_RPC,
  AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
  AWS_S3_BUCKET_REGION: process.env.AWS_S3_BUCKET_REGION,
  netConfig: {
    addresses: [
      // {
      //   network: "mainnet",
      //   chain: 1,
      //   PXL: "",
      //   USDT: "",
      //   NFT: "",
      //   AUCTION: "",
      //   startBlock: 9607271,
      //   RPC: process.env.MAINNET_RPC,
      // },
      // {
      //   network: "ropsten",
      //   chain: "3",
      //   PXL: "",
      //   USDT: "",
      //   NFT: "",
      //   AUCTION: "",
      //   startBlock: 9607271,
      // },
      {
        network: "rinkeby",
        chain: 4,
        PXL: "",
        USDT: "",
        NFT: "",
        AUCTION: "",
        RPC: process.env.TESTNET_RPC,
        startBlock: 9612918,
      },
    ],
    pollInterval: 15000,
  },
};
