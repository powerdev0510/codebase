const Connection = require("../models/connection");
const User = require("../models/user");
const msg = require("../utils/message");

/**
 * @swagger
 *
 * /connection/check/:followId:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: Follow status
 *     description: Check if user is following
 *     tags:
 *       - Connection
 *     parameters:
 *       - in: path
 *         followId: string
 *     responses:
 *       200:
 *         description: Return result
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

const isFollowing = async (req, res) => {
  try {
    const { followId } = req.params || {};
    const { _id: userId } = req.user;

    const isFollow = await Connection.countDocuments({ userId, followId });
    res.send({ success: isFollow === 1 });
  } catch (e) {
    console.log(msg.server_error, e);
    res.status(500).json({ success: false, message: msg.server_error });
  }
};

/**
 * @swagger
 *
 * /connection/follow/:followId:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: Follow user
 *     description: Add user to follow
 *     tags:
 *       - Connection
 *     parameters:
 *       - in: path
 *         followId: string
 *     responses:
 *       200:
 *         description: Return result
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

const addFollower = async (req, res) => {
  try {
    const { followId } = req.params || {};
    const { _id: userId } = req.user;

    const follower = await User.findById(followId);
    if (!follower) {
      return res
        .status(400)
        .json({ success: false, message: msg.followId_invalid });
    }

    await Connection.create({ userId, followId });

    res.send({ success: true, message: msg.follow_success });
  } catch (e) {
    console.log(msg.server_error, e);
    res.status(400).json({ success: false, message: msg.server_error });
  }
};

/**
 * @swagger
 *
 * /connection/follow/:followId:
 *   delete:
 *     security:
 *       - Bearer: []
 *     summary: Unfollow user
 *     description: Remove user from follow list
 *     tags:
 *       - Connection
 *     parameters:
 *       - in: path
 *         followId: string
 *     responses:
 *       200:
 *         description: Return result
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

const removeFollower = async (req, res) => {
  try {
    const { followId } = req.params || {};
    const { _id: userId } = req.user;

    await Connection.findOneAndDelete({ userId, followId });
    res.send({ success: true, message: msg.unfollow_success });
  } catch (e) {
    console.log(msg.server_error, e);
    res.status(500).json({ success: false, message: msg.server_error });
  }
};

/**
 * @swagger
 *
 * /connection/follower/count:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: Follower count
 *     description: Get follower count
 *     tags:
 *       - Connection
 *     responses:
 *       200:
 *         description: Return count
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

const getFollowerCount = async (req, res) => {
  try {
    const { _id: userId } = req.user;

    const count = await Connection.countDocuments({ userId });

    res.send({ success: true, data: { count } });
  } catch (e) {
    console.log(msg.server_error, e);
    res.status(500).json({ success: false, message: msg.server_error });
  }
};

/**
 * @swagger
 *
 * /connection/follower/list:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: Follower list
 *     description: Get follower list
 *     tags:
 *       - Connection
 *     responses:
 *       200:
 *         description: Return follower list
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

const getFollowers = async (req, res) => {
  try {
    const { _id: userId } = req.user;

    const data = await Connection.find({ userId });

    res.send({ success: true, data });
  } catch (e) {
    console.log(msg.server_error, e);
    res.status(500).json({ success: false, message: msg.server_error });
  }
};

/**
 * @swagger
 *
 * /connection/following/count:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: Following count
 *     description: Get following count
 *     tags:
 *       - Connection
 *     responses:
 *       200:
 *         description: Return following count
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

const getFollowingCount = async (req, res) => {
  try {
    const { _id: followId } = req.user;

    const count = await Connection.countDocuments({ followId });

    res.send({ success: true, data: { count } });
  } catch (e) {
    console.log(msg.server_error, e);
    res.status(500).json({ success: false, message: msg.server_error });
  }
};

/**
 * @swagger
 *
 * /connection/following/list:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: Following list
 *     description: Get following list
 *     tags:
 *       - Connection
 *     responses:
 *       200:
 *         description: Return following list
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

const getFollowingList = async (req, res) => {
  try {
    const { _id: followId } = req.user;

    const data = await Connection.find({ followId });

    res.send({ success: true, data });
  } catch (e) {
    console.log(msg.server_error, e);
    res.status(400).json({ success: false, message: msg.server_error });
  }
};

module.exports = {
  isFollowing,
  addFollower,
  removeFollower,
  getFollowerCount,
  getFollowers,
  getFollowingCount,
  getFollowingList,
};
