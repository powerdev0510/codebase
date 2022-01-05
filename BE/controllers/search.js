const { validationResult } = require("express-validator");
const User = require("../models/user");
const Auction = require("../models/auction");
const msg = require("../utils/message");

const getUsers = async (req, res) => {
  try {
    const {
      query = "",
      limit = 20,
      skip = 0,
      sortBy = "_id",
      sortOrder = "asc",
    } = req.query || {};

    let where = {};
    if (query !== "") {
      const str = query.replace(/\'/g, "");
      where = {
        $or: [
          { address: new RegExp(str) },
          { name: new RegExp(str) },
          { username: new RegExp(str) },
        ],
      };
    }
    const users =
      (await User.find(
        where,
        {},
        {
          sort: { [sortBy]: sortOrder.toLowerCase() === "asc" ? 1 : -1 },
        }
      ).lean()) || [];

    res.send({
      success: true,
      data: users.slice(parseInt(skip), parseInt(limit)),
      totalItems: users.length,
    });
  } catch (e) {
    res
      .status(500)
      .json({ success: false, message: msg.server_error, error: e.toString() });
  }
};

const getAuctions = async (req, res) => {
  try {
    const {
      query = "",
      limit = 20,
      skip = 0,
      sortBy = "_id",
      sortOrder = "asc",
    } = req.query || {};

    let where = {};
    if (query !== "") {
      const str = query.replace(/\'/g, "");
      where = {
        $or: [
          { name: new RegExp(str) },
          { description: new RegExp(str) },
          { category: new RegExp(str) },
        ],
      };
    }
    const auctions =
      (await Auction.find(
        where,
        {},
        {
          sort: { [sortBy]: sortOrder.toLowerCase() === "asc" ? 1 : -1 },
        }
      ).lean()) || [];

    res.send({
      success: true,
      data: auctions.slice(parseInt(skip), parseInt(limit)),
      totalItems: auctions.length,
    });
  } catch (e) {
    res
      .status(500)
      .json({ success: false, message: msg.server_error, error: e.toString() });
  }
};

module.exports = {
  getUsers,
  getAuctions,
};
