const Web3 = require("web3");
const { validationResult } = require("express-validator");
const AUCTION_ABI = require("../abi/eth_auctionABI.json");
const PIXEL_ABI = require("../abi/eth_pixelABI.json");
const config = require("../config");
const msg = require("../utils/message");
const { getAddress } = require("../utils");

const web3 = new Web3(config.TESTNET_RPC);

/**
 * @swagger
 *
 * /pixel/approve/:auctionId:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: Approve Pixel Purchase
 *     description: Approve Pixel Purchase
 *     tags:
 *       - Pixel
 *     parameters:
 *       - in: path
 *         name: auctionId
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
    const { id: auctionId } = req.params || {};

    const txCount = web3.eth.getTransactionCount(address);
    const gasPrice = await web3.eth.getGasPrice();

    const chainId = 4;
    const { AUCTION: AUCTION_ADDRESS, PXL: PIXEL_ADDRESS } =
      getAddress(chainId);

    const AUCTION_CONTRACT = new web3.eth.Contract(
      AUCTION_ABI,
      AUCTION_ADDRESS
    );
    const PIXEL_CONTRACT = new web3.eth.Contract(PIXEL_ABI, PIXEL_ADDRESS);

    const { price } = await AUCTION_CONTRACT.methods.auctions(auctionId).call();

    const txObject = {
      to: PIXEL_ADDRESS,
      from: address,
      nonce: web3.utils.toHex(txCount),
      gasLimit: web3.utils.toHex(30000),
      gasPrice: web3.utils.toHex(gasPrice),
      data: PIXEL_CONTRACT.methods.approve(AUCTION_ADDRESS, price).encodeABI(),
    };

    res.send({ success: true, data: txObject });
  } catch (e) {
    res
      .status(500)
      .json({ success: false, message: msg.server_error, error: e.toString() });
  }
};

module.exports = {
  approve,
};
