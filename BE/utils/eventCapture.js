"use strict";
/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */
const Web3 = require("web3");
const EthereumEvents = require("ethereum-events");
const config = require("../config");
const { pollInterval, addresses } = config.netConfig;
const chainId = 4;
const address = addresses.find(({ chain }) => chain === chainId);
const { startBlock: createdBlock, AUCTION, NFT, RPC } = address;
const AUCTION_ABI = require("../abi/eth_auctionABI.json");
const NFT_ABI = require("../abi/eth_nftABI.json");
const Transaction = require("../models/transaction");
const Auction = require("../models/auction");
const User = require("../models/user");
const { getJsonFromUrl } = require("../utils");

const contracts = [
  {
    name: "PixelVerse",
    address: AUCTION,
    abi: AUCTION_ABI,
    events: ["Purchase", "Mint"],
  },
];
const options = {
  pollInterval,
  confirmations: 1,
  chunkSize: 5000,
  concurrency: 10,
  backoff: 1000,
};

const web3 = new Web3(RPC);

const ethereumEvents = new EthereumEvents(web3, contracts, options);

const AUCTION_CONTRACT = new web3.eth.Contract(AUCTION_ABI, AUCTION);
const NFT_CONTRACT = new web3.eth.Contract(NFT_ABI, NFT);

module.exports = async () => {
  ethereumEvents.on("block.confirmed", async (blockNumber, events, done) => {
    if (events.length > 0) {
      console.log("New events detected at block: ", blockNumber);
      events.forEach(async (event) => {
        const txEvent = await Transaction.findOne({
          txHash: event.transactionHash,
        });
        if (txEvent) {
          console.log("Tx Existed", blockNumber);
        } else {
          // console.log(event.values);
          // console.log(event);
          try {
            Transaction.create({
              blockNumber,
              type: event.name,
              txHash: event.transactionHash,
              from: event.from,
              to: event.to,
              ...event.values,
            });
          } catch (e) {
            console.log(e);
          }
        }

        // Add auctions
        try {
          if (event.name === "Mint") {
            const { itemId } = event.values;

            if (itemId) {
              const auctionData = await Auction.findOne({ itemId });
              if (auctionData) {
                console.log("Auction Existed", itemId);
              } else {
                const auction = await AUCTION_CONTRACT.methods
                  .auctions(itemId)
                  .call();
                const uri = await NFT_CONTRACT.methods.uris(itemId).call();
                if (uri.startsWith(config.PINATA_GATEWAY)) {
                  const collection = (await getJsonFromUrl(uri)) || {};
                  const seller = await User.findOne({
                    address: auction.seller,
                  });
                  if (!seller) {
                    const user = new User({ address: auction.seller });
                    await user.save();
                  }
                  const bidder = await User.findOne({
                    address: auction.bidder,
                  });
                  if (!bidder) {
                    const user = new User({ address: auction.bidder });
                    await user.save();
                  }
                  Auction.create({
                    blockNumber,
                    itemId,
                    tokenId: collection.tokenId,
                    mediaPath: collection.media,
                    name: collection.title,
                    description: collection.description || "",
                    category: collection.category,
                    price: web3.utils.fromWei(
                      String(auction.buyPrice),
                      "ether"
                    ),
                    startPrice: web3.utils.fromWei(
                      String(auction.bidPrice),
                      "ether"
                    ),
                    nft: auction.nft,
                    seller: auction.seller,
                    bidder: auction.bidder,
                    createdAt: auction.createdAt * 1000,
                    updatedAt: auction.updatedAt * 1000,
                    startAt: auction.start * 1000,
                    endAt: auction.end * 1000,
                  });
                }
              }
            }
          }
        } catch (e) {
          console.log(e);
        }
      });
    }
    done();
  });
  ethereumEvents.on("error", (err) => {
    console.log("BSC listening Error, Restarting listener", err);
    ethereumEvents.start();
  });

  const lastTxEvent = await Transaction.findOne(
    {},
    {},
    { sort: { blockNumber: -1 } }
  );
  const lastAuction = await Auction.findOne(
    {},
    {},
    { sort: { blockNumber: -1 } }
  );

  let startBlock = createdBlock;
  if (lastTxEvent && lastAuction) {
    startBlock = Math.min(
      parseInt(lastTxEvent.blockNumber),
      parseInt(lastAuction.blockNumber)
    );
    // } else if (lastTxEvent) {
    //   startBlock = parseInt(lastTxEvent.blockNumber);
    // } else if (lastAuction) {
    //   startBlock = parseInt(lastAuction.blockNumber);
  }
  console.log("Start block:", startBlock);
  ethereumEvents.start(startBlock);
  console.log("BSC event listener is running: ", ethereumEvents.isRunning()); // true
};
