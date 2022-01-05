const Web3 = require("web3");
const { validationResult } = require("express-validator");
const User = require("../models/user");
const config = require("../config");
const NFT_ABI = require("../abi/eth_nftABI.json");
const AUCTION_ABI = require("../abi/eth_auctionABI.json");
const msg = require("../utils/message");
const { getJsonFromUrl } = require("../utils");
const Transaction = require("../models/transaction");
const Auction = require("../models/auction");
const WatchList = require("../models/watchList");
const { getAddress } = require("../utils");

const web3 = new Web3(config.TESTNET_RPC);

/**
 * @swagger
 *
 * /auction/detail/:id:
 *   get:
 *     summary: Get auction info
 *     description: Get auction info
 *     tags:
 *       - Auction
 *     parameters:
 *       - in: path
 *         name: auctionId
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Return auction detail
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             isWatched:
 *               type: boolean
 *             data:
 *               type: object
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

const getAuctionInfo = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array() });
    }

    const { id: auctionId } = req.params || {};
    const chainId = 4;
    const { AUCTION: AUCTION_ADDRESS, NFT: NFT_ADDRESS } = getAddress(chainId);

    const AUCTION_CONTRACT = new web3.eth.Contract(
      AUCTION_ABI,
      AUCTION_ADDRESS
    );
    const NFT_CONTRACT = new web3.eth.Contract(NFT_ABI, NFT_ADDRESS);

    const auction = await AUCTION_CONTRACT.methods.auctions(auctionId).call();
    const uri = await NFT_CONTRACT.methods.uris(auction.itemId).call();

    if (!uri.startsWith(config.PINATA_GATEWAY)) {
      return res
        .status(400)
        .json({ success: false, message: msg.auction_invalid });
    }

    const collection = await getJsonFromUrl(uri);
    const seller = (await User.findOne({ address: auction.seller })) || {
      address: auction.seller,
    };
    const bidder = (await User.findOne({ address: auction.bidder })) || {
      address: auction.bidder,
    };
    seller.imgSrc = seller.profileImg;
    const isPurchased = await Transaction.findOne({
      auctionId: auction.itemId,
      type: "Purchase",
    });
    const status = !!isPurchased ? "complete" : "live";

    const data = {
      id: auctionId,
      imgSrc: collection.media,
      name: collection.title,
      description: collection.description || "",
      price: web3.utils.fromWei(String(auction.price), "ether"),
      status,
      timestamp:
        status === "live" ? auction.end * 1000 - new Date().getTime() : 0,
      collection: {
        id: collection.tokenId,
        name: collection.title,
        imgSrc: collection.media,
        relatedUsers: [seller],
      },
      owner: status === "live" ? seller : bidder,
      creator: seller,
      // history: []
    };
    let isWatched = false;
    if (req.user) {
      const { _id: userId } = req.user;
      const watchList = await WatchList.findOne({ auctionId, userId });
      if (watchList) isWatched = true;
      else isWatched = false;
    }

    res.send({ success: true, isWatched, data });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ success: false, message: msg.server_error, error: e.toString() });
  }
};

/**
 * @swagger
 *
 * /auction/list:
 *   get:
 *     summary: Get auction list by category
 *     description: Get auction list by category
 *     tags:
 *       - Auction
 *     parameters:
 *       - in: query
 *         name: category
 *         type: string
 *         required: false
 *       - in: query
 *         name: limit
 *         type: number
 *         required: false
 *       - in: query
 *         name: skip
 *         type: number
 *         required: false
 *       - in: query
 *         name: sortBy
 *         type: string
 *         enum: [itemId, tokenId, name, category, createdAt, updatedAt, startAt, endAt]
 *         required: false
 *       - in: query
 *         name: sortOrder
 *         type: string
 *         enum: [asc, desc]
 *         required: false
 *     responses:
 *       200:
 *         description: Auction list
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

const getAuctionList = async (req, res) => {
  try {
    const {
      category = "all",
      limit = 10,
      skip = 0,
      sortBy = "itemId",
      sortOrder = "asc",
    } = req.query || {};
    // const chainId = 4;

    let where = {};
    if (category !== "all") {
      where = { category };
    }

    const auctions =
      (await Auction.find(
        where,
        {},
        {
          sort: { [sortBy]: sortOrder.toLowerCase() === "asc" ? 1 : -1 },
          limit: parseInt(limit),
          skip: parseInt(skip),
        }
      ).lean()) || [];
    const data = [];

    for (const auction of auctions) {
      if (category === auction.category || category === "all") {
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
    }

    res.send({ success: true, data });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ success: false, message: msg.server_error, error: e.toString() });
  }
};

/**
 * @swagger
 *
 * /auction/create:
 *   post:
 *     security:
 *       - Bearer: []
 *     summary: Create auction
 *     description: Create auction
 *     tags:
 *       - Auction
 *     parameters:
 *       - in: body
 *         schema:
 *           type: object
 *           required:
 *             tokenId:
 *               type: number
 *             startPrice:
 *               type: number
 *             price:
 *               type: number
 *             startTime:
 *               type: number
 *             endTime:
 *               type: number
 *           properties:
 *             tokenId:
 *               type: number
 *             startPrice:
 *               type: number
 *             price:
 *               type: number
 *             startTime:
 *               type: number
 *             endTime:
 *               type: number
 *     responses:
 *       200:
 *         description: Signed transaction
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

const createAuction = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array() });
    }

    const {
      tokenId = "",
      startPrice,
      price,
      startTime = "",
      endTime = "",
    } = req.body || {};
    const { address } = req.user;
    const chainId = 4;
    const { AUCTION: AUCTION_ADDRESS, NFT: NFT_ADDRESS } = getAddress(chainId);

    const AUCTION_CONTRACT = new web3.eth.Contract(
      AUCTION_ABI,
      AUCTION_ADDRESS
    );

    const txCount = web3.eth.getTransactionCount(address);
    const gasPrice = await web3.eth.getGasPrice();

    const txObject = {
      to: AUCTION_ADDRESS,
      from: address,
      nonce: web3.utils.toHex(txCount),
      gasLimit: web3.utils.toHex(30000),
      gasPrice: web3.utils.toHex(gasPrice),
      data: AUCTION_CONTRACT.methods
        .createAuction(
          NFT_ADDRESS,
          tokenId,
          web3.utils.toWei(String(price), "ether"),
          web3.utils.toWei(String(startPrice), "ether"),
          startTime,
          endTime
        )
        .encodeABI(),
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
 * /auction/bid:
 *   post:
 *     security:
 *       - Bearer: []
 *     summary: Place bid on auction
 *     description: Place bid on auction
 *     tags:
 *       - Auction
 *     parameters:
 *       - in: body
 *         schema:
 *           type: object
 *           required:
 *             auctionId:
 *               type: number
 *             price:
 *               type: number
 *           properties:
 *             auctionId:
 *               type: number
 *             price:
 *               type: number
 *     responses:
 *       200:
 *         description: Signed transaction
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

const placeBid = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array() });
    }

    const { price, auctionId } = req.body || {};
    const { address } = req.user;
    const chainId = 4;
    const { AUCTION: AUCTION_ADDRESS } = getAddress(chainId);

    const txCount = web3.eth.getTransactionCount(address);
    const gasPrice = await web3.eth.getGasPrice();

    const AUCTION_CONTRACT = new web3.eth.Contract(
      AUCTION_ABI,
      AUCTION_ADDRESS
    );

    const txObject = {
      to: AUCTION_ADDRESS,
      from: address,
      nonce: web3.utils.toHex(txCount),
      gasLimit: web3.utils.toHex(30000),
      gasPrice: web3.utils.toHex(gasPrice),
      data: AUCTION_CONTRACT.methods
        .bid(auctionId, web3.utils.toWei(String(price), "ether"))
        .encodeABI(),
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
 * /auction/purchase/:id:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: Purchase auction
 *     description: Purchase auction
 *     tags:
 *       - Auction
 *     parameters:
 *       - in: path
 *         name: auctionId
 *         type: number
 *         required: true
 *     responses:
 *       200:
 *         description: Signed transaction
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

const purchase = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array() });
    }

    const { id: auctionId } = req.params || {};
    const { address } = req.user;
    const chainId = 4;
    const { AUCTION: AUCTION_ADDRESS } = getAddress(chainId);

    const AUCTION_CONTRACT = new web3.eth.Contract(
      AUCTION_ABI,
      AUCTION_ADDRESS
    );

    const txCount = web3.eth.getTransactionCount(address);
    const gasPrice = await web3.eth.getGasPrice();

    const txObject = {
      to: AUCTION_ADDRESS,
      from: address,
      nonce: web3.utils.toHex(txCount),
      gasLimit: web3.utils.toHex(30000),
      gasPrice: web3.utils.toHex(gasPrice),
      data: AUCTION_CONTRACT.methods.purchase(auctionId).encodeABI(),
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
 * /auction/history/:id:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: Get auction history
 *     description: Get auction history
 *     tags:
 *       - Auction
 *     parameters:
 *       - in: path
 *         name: auctionId
 *         type: number
 *         required: true
 *     responses:
 *       200:
 *         description: Return auction history
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

const getHistory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array() });
    }

    const { id } = req.params;

    const txList =
      (await Transaction.find({
        $or: [{ auctionId: id }, { itemId: id }],
      }).lean()) || [];
    const data = [];

    for (const tx of txList) {
      const user = await User.findOne({ address: tx.from });
      data.push({ ...tx, user });
    }

    res.send({ success: true, data });
  } catch (e) {
    res
      .status(500)
      .json({ success: false, message: msg.server_error, error: e.toString() });
  }
};

const watch = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array() });
    }

    const { id: auctionId } = req.params || {};
    const { _id: userId } = req.user;

    const watchList = new WatchList({ auctionId, userId, isWatched: true });
    watchList.save();
    res.send({ success: true, data: watchList });
  } catch (e) {
    res
      .status(500)
      .json({ success: false, message: msg.server_error, error: e.toString() });
  }
};

const isWatched = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array() });
    }
    const { id: auctionId } = req.params || {};
    const { _id: userId } = req.user;
    const watchList = await WatchList.findOne({ auctionId, userId });
    if (watchList) res.send({ success: true, isWatched: true });
    else res.send({ success: true, isWatched: false });
  } catch (e) {
    res
      .status(500)
      .json({ success: false, message: msg.server_error, error: e.toString() });
  }
};

module.exports = {
  getAuctionInfo,
  getAuctionList,
  createAuction,
  placeBid,
  purchase,
  getHistory,
  watch,
  isWatched,
};
