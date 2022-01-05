const { validationResult } = require("express-validator");
const Web3 = require("web3");
const pinataSDK = require("@pinata/sdk");
const fs = require("fs");
const NFT_ABI = require("../abi/eth_nftABI.json");
const AUCTION_ABI = require("../abi/eth_auctionABI.json");
const config = require("../config");
const msg = require("../utils/message");
const User = require("../models/user");
const Auction = require("../models/auction");
const Transaction = require("../models/transaction");
const { getAddress } = require("../utils");
const { getJsonFromUrl } = require("../utils");

const web3 = new Web3(config.TESTNET_RPC);
const pinata = pinataSDK(config.PINATA_API_KEY, config.PINATA_API_SECRET);

/**
 * @swagger
 *
 * /nft/mint:
 *   post:
 *     security:
 *       - Bearer: []
 *     summary: Mint NFT
 *     description: Mint NFT
 *     tags:
 *       - NFT
 *     parameters:
 *       - in: body
 *         schema:
 *           type: object
 *           required:
 *             title:
 *               type: string
 *             chain:
 *               type: number
 *             category:
 *               type: string
 *             description:
 *               type: string
 *           properties:
 *             title:
 *               type: string
 *             chain:
 *               type: number
 *             category:
 *               type: string
 *             description:
 *               type: string
 *     responses:
 *       200:
 *         description: Return Transaction Object
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             data:
 *               type: object
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

const mintNFT = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array() });
    }

    const { title, chain, category, description } = req.body || {};
    const { media } = req.files || {};
    const { address } = req.user;

    if (!media) {
      return res
        .status(409)
        .json({ success: false, message: "media is required" });
    }

    const { AUCTION: AUCTION_ADDRESS, NFT: NFT_ADDRESS } = getAddress(chain);

    const AUCTION_CONTRACT = new web3.eth.Contract(
      AUCTION_ABI,
      AUCTION_ADDRESS
    );

    const rs = fs.createReadStream(media.tempFilePath);
    const options = {
      pinataMetadata: {
        name: "solPixelImg",
        keyvalues: {
          media: "solpixelNFT",
        },
      },
      pinataOptions: {
        cidVersion: 0,
      },
    };
    const result = await pinata.pinFileToIPFS(rs, options);
    const imgHash = config.PINATA_GATEWAY + result.IpfsHash;
    fs.unlinkSync(media.tempFilePath);

    const sampleObject = {
      creator: address,
      media: imgHash,
      title,
      chain,
      category,
      description,
    };

    const options1 = {
      pinataMetadata: {
        name: "Metadata",
        keyvalues: {
          media: "NFT metadata",
        },
      },
      pinataOptions: {
        cidVersion: 0,
      },
    };
    const result1 = await pinata.pinJSONToIPFS(sampleObject, options1);
    const metadataHash = config.PINATA_GATEWAY + result1.IpfsHash;

    // blockchain mint start
    const txCount = web3.eth.getTransactionCount(address);
    const price = 0.0001;
    const txObject = {
      to: AUCTION_ADDRESS,
      from: address,
      nonce: web3.utils.toHex(txCount),
      gasLimit: web3.utils.toHex(1000000),
      gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
      data: AUCTION_CONTRACT.methods
        .mint(
          NFT_ADDRESS,
          metadataHash,
          web3.utils.toHex(web3.utils.toWei(price, "ether")),
          Math.floor(Date.now() / 1000),
          Math.floor(Date.now() / 1000 + 86400)
        )
        .encodeABI(),
    };
    // blockchain mint end

    res.send({ success: true, data: txObject });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: msg.server_error });
  }
};

/**
 * @swagger
 *
 * /nft/balance:
 *   get:
 *     summary: Get balance
 *     description: Get balance
 *     tags:
 *       - NFT
 *     responses:
 *       200:
 *         description: Return NFT balance
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             data:
 *               type: object
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

const getBalance = (req, res) => {
  try {
    const { address } = req.user;
    const chainId = 4;
    const { NFT: NFT_ADDRESS } = getAddress(chainId);

    const NFT_CONTRACT = new web3.eth.Contract(NFT_ABI, NFT_ADDRESS);

    NFT_CONTRACT.methods.balanceOf(address).call((error, balance) => {
      if (error) {
        res.status(400).json({ success: false, error });
      } else {
        res.send({ success: true, data: { balance } });
      }
    });
  } catch (e) {
    res.status(500).json({ success: false, message: msg.server_error });
  }
};

/**
 * @swagger
 *
 * /nft/collections:
 *   get:
 *     summary: Get collections
 *     description: Get collections
 *     tags:
 *       - NFT
 *     responses:
 *       200:
 *         description: Return collections
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             data:
 *               type: object
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

const getCollections = async (req, res) => {
  try {
    const promises = [];
    const users = await User.find({});
    const chainId = 4;
    const { NFT: NFT_ADDRESS } = getAddress(chainId);
    const NFT_CONTRACT = new web3.eth.Contract(NFT_ABI, NFT_ADDRESS);

    for (const user of users) {
      const { address } = user;

      const balance = await NFT_CONTRACT.methods
        .balanceOf(web3.utils.toChecksumAddress(address))
        .call();

      for (let i = 0; i < balance; i++) {
        const promise = new Promise(async (resolve, reject) => {
          try {
            const tokenId = await NFT_CONTRACT.methods
              .tokenOfOwnerByIndex(web3.utils.toChecksumAddress(address), i)
              .call();
            const uri = await NFT_CONTRACT.methods.uris(tokenId).call();
            if (uri.startsWith(config.PINATA_GATEWAY)) {
              const ret = await getJsonFromUrl(uri);
              if (ret) {
                ret.tokenId = tokenId;
                resolve(ret);
              }
            }
            resolve();
          } catch (e) {
            reject(e);
          }
        });

        promises.push(promise);
      }
    }

    const data = (await Promise.all(promises)).filter((ret) => !!ret);

    res.send({ success: true, data });
  } catch (e) {
    res
      .status(500)
      .json({ success: false, message: msg.server_error, error: e.toString() });
  }
};

/**
 * @swagger
 *
 * /nft/mycollections:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: Get my collections
 *     description: Get my collections
 *     tags:
 *       - NFT
 *     responses:
 *       200:
 *         description: Return collections
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             data:
 *               type: object
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

const getMyCollections = async (req, res) => {
  try {
    const { address } = req.user;
    const promises = [];
    const chainId = 4;
    const { NFT: NFT_ADDRESS } = getAddress(chainId);

    const NFT_CONTRACT = new web3.eth.Contract(NFT_ABI, NFT_ADDRESS);

    const balance = await NFT_CONTRACT.methods
      .balanceOf(web3.utils.toChecksumAddress(address))
      .call();

    for (let i = 0; i < balance; i++) {
      const promise = new Promise(async (resolve, reject) => {
        try {
          const tokenId = await NFT_CONTRACT.methods
            .tokenOfOwnerByIndex(web3.utils.toChecksumAddress(address), i)
            .call();
          const uri = await NFT_CONTRACT.methods.uris(tokenId).call();
          if (uri.startsWith(config.PINATA_GATEWAY)) {
            const ret = await getJsonFromUrl(uri);
            if (ret) {
              ret.tokenId = tokenId;
              resolve(ret);
            }
          }
          resolve();
        } catch (e) {
          reject(e);
        }
      });

      promises.push(promise);
    }

    const data = (await Promise.all(promises)).filter((ret) => !!ret);

    res.send({ success: true, data });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, message: msg.server_error });
  }
};

/**
 * @swagger
 *
 * /nft/approve/:tokenId:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: Approve NFT
 *     description: Approve NFT
 *     tags:
 *       - NFT
 *     parameters:
 *       - in: path
 *         name: tokenId
 *         type: number
 *         required: true
 *     responses:
 *       200:
 *         description: Return txObject
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             data:
 *               type: object
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

const approve = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array() });
    }

    const { address } = req.user;
    const { tokenId = "" } = req.params || {};

    const txCount = web3.eth.getTransactionCount(address);
    const gasPrice = await web3.eth.getGasPrice();

    const chainId = 4;
    const { AUCTION: AUCTION_ADDRESS, NFT: NFT_ADDRESS } = getAddress(chainId);

    const NFT_CONTRACT = new web3.eth.Contract(NFT_ABI, NFT_ADDRESS);

    // Approve NFT
    const txObject = {
      to: NFT_ADDRESS,
      from: address,
      nonce: web3.utils.toHex(txCount),
      gasLimit: web3.utils.toHex(30000),
      gasPrice: web3.utils.toHex(gasPrice),
      data: NFT_CONTRACT.methods.approve(AUCTION_ADDRESS, tokenId).encodeABI(),
    };

    res.send({ success: true, data: txObject });
  } catch (e) {
    res
      .status(500)
      .json({ success: false, message: msg.server_error, error: e.toString() });
  }
};

/**
 * @swagger
 *
 * /nft/creators:
 *   get:
 *     summary: Get NFT creators list by category
 *     description: Get NFT creators list by category
 *     tags:
 *       - NFT
 *     parameters:
 *       - in: query
 *         name: limit
 *         type: number
 *         required: false
 *       - in: query
 *         name: skip
 *         type: number
 *         required: false
 *     responses:
 *       200:
 *         description: Get NFT creators list
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             data:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Internal server error
 */

const getCreators = async (req, res) => {
  try {
    const { limit = 10, skip = 0 } = req.query || {};

    const auctions =
      (await Auction.find(
        {},
        {},
        {
          limit: parseInt(limit),
          skip: parseInt(skip),
        }
      ).lean()) || [];

    const data = [];

    for (const auction of auctions) {
      const seller = await User.findOne({
        address: auction.seller,
      });

      const isPurchased = await Transaction.findOne({
        auctionId: auction.itemId,
        type: "Purchase",
      });

      let bidder = {};
      if (isPurchased)
        bidder = await User.findOne({
          address: isPurchased.from,
        });

      data.push({
        ...auction,
        owner: !isPurchased ? seller : bidder,
        creator: seller,
        status: !!isPurchased ? "complete" : "live",
      });
    }

    res.send({ success: true, data });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ success: false, message: msg.server_error, error: e.toString() });
  }
};

module.exports = {
  mintNFT,
  getBalance,
  getCollections,
  getMyCollections,
  approve,
  getJsonFromUrl,
  getCreators,
};
