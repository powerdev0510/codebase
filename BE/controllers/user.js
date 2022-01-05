const fs = require("fs");
const got = require("got");
const sharp = require("sharp");
const pinataSDK = require("@pinata/sdk");
const { validationResult } = require("express-validator");

const s3 = require("./s3");
const config = require("../config");
const User = require("../models/user");
const msg = require("../utils/message");
const { generateToken, verifyToken, getApiUrl } = require("../utils");

const pinata = pinataSDK(config.PINATA_API_KEY, config.PINATA_API_SECRET);

const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].replace("Bearer ", "");
    const user = verifyToken(token);
    req.user = user;
    next();
  } catch (e) {
    res.status(500).json({ success: false, message: msg.token_invalid });
  }
};

/**
 * @swagger
 *
 * /user/connect:
 *   post:
 *     summary: Connect wallet
 *     description: Connect wallet
 *     tags:
 *       - User
 *     parameters:
 *       - in: body
 *         address: string
 *     responses:
 *       200:
 *         description: Return token
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             data:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

const connect = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array() });
    }

    const { address = "" } = req.body || {};
    let user = await User.findOne({ address });

    if (!user) {
      user = new User({ address });
      await user.save();
    }

    const token = generateToken(JSON.stringify(user));
    res.send({ success: true, data: { token } });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: msg.server_error,
    });
  }
};

/**
 * @swagger
 *
 * /user/register/unique-check:
 *   post:
 *     summary: Register Unique Check
 *     description: Register User Unique Check
 *     tags:
 *       - User
 *     parameters:
 *       - in: query
 *         name: username
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Return result
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             isUnique:
 *               type: boolean
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

const isUnique = async (req, res) => {
  try {
    const { username = "" } = req.query || {};
    const isExists = await User.findOne({ username });
    if (isExists) res.send({ success: true, isUnique: false });
    else res.send({ success: true, isUnique: true });
  } catch (e) {
    res.status(500).json({ success: false, message: msg.server_error });
  }
};

/**
 * @swagger
 *
 * /user/update/:address:
 *   post:
 *     summary: Update
 *     description: Update User
 *     tags:
 *       - User
 *     parameters:
 *       - in: body
 *         name: string
 *         email: string
 *         profileImg: binary
 *         coverImg: binary
 *       - in: params
 *         address: address
 *         type: string
 *         required: true
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

const update = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array() });
    }

    const { username = "", email = "" } = req.body || {};
    const { profileImg, coverImg } = req.files || {};
    const { address } = req.params || {};
    let user = await User.findOne({ address });
    if (!user) {
      return res.status(500).json({
        success: false,
        message: msg.user_not_exists,
      });
    }

    if (profileImg) {
      const rs = fs.createReadStream(profileImg.tempFilePath);
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
      const profileImgHash = config.PINATA_GATEWAY + result.IpfsHash;
      fs.unlinkSync(profileImg.tempFilePath);
      user.profileImg = profileImgHash;
    }

    if (coverImg) {
      const rs1 = fs.createReadStream(coverImg.tempFilePath);
      const options1 = {
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
      const result1 = await pinata.pinFileToIPFS(rs1, options1);
      const coverImgHash = config.PINATA_GATEWAY + result1.IpfsHash;
      fs.unlinkSync(coverImg.tempFilePath);
      user.coverImg = coverImgHash;
    }

    user.username = username;
    user.email = email;
    await user.save();

    res.send({ success: true, data: user });
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
 * /user/register:
 *   post:
 *     summary: Register
 *     description: Register User
 *     tags:
 *       - User
 *     parameters:
 *       - in: body
 *         name: string
 *         address: string
 *         profileImg: binary
 *         coverImg: binary
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

const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array() });
    }

    const { username = "", name = "", address = "" } = req.body || {};
    const { profileImg, coverImg } = req.files || {};

    if (/[A-Za-z0-9_]/.test(username) === false) {
      return res
        .status(400)
        .json({ success: false, message: msg.name_invalid });
    }

    const isExists = await User.findOne({ username });
    if (isExists)
      return res
        .status(400)
        .json({ success: false, message: msg.username_not_unique });

    if (!profileImg) {
      return res
        .status(400)
        .json({ success: false, message: msg.images_required });
    }

    let user = await User.findOne({ address });
    if (!user) {
      user = new User({ address, name });
    }

    const rs = fs.createReadStream(profileImg.tempFilePath);
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
    const profileImgHash = config.PINATA_GATEWAY + result.IpfsHash;
    fs.unlinkSync(profileImg.tempFilePath);

    let coverImgHash = "";

    if (coverImg) {
      const rs1 = fs.createReadStream(coverImg.tempFilePath);
      const options1 = {
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
      const result1 = await pinata.pinFileToIPFS(rs1, options1);
      coverImgHash = config.PINATA_GATEWAY + result1.IpfsHash;
      fs.unlinkSync(coverImg.tempFilePath);
    }

    user.name = name;
    user.username = username;
    user.profileImg = profileImgHash;
    user.coverImg = coverImgHash;

    await user.save();

    const token = generateToken(JSON.stringify(user));
    res.send({ success: true, data: { token } });
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
 * /user/profile:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: Get user profile
 *     description: Get user profile
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Return user profile
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

const getProfile = async (req, res) => {
  try {
    const { address } = req.params || {};
    const user = await User.findOne({ address });
    if (!user) {
      return res.status(500).json({
        success: false,
        message: msg.user_not_exists,
      });
    }
    res.send({ success: true, data: user });
  } catch (e) {
    res.status(500).json({ success: false, message: msg.server_error });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({ name: { $nin: ["", undefined, null] } });
    res.send({ success: true, data: users });
  } catch (e) {
    res.status(500).json({ success: false, message: msg.server_error });
  }
};

/**
 * @swagger
 *
 * /image:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: Get image
 *     description: Get image
 *     tags:
 *       - User
 *     parameters:
 *       - in: query
 *         name: url
 *         type: string
 *         required: true
 *       - in: query
 *         name: width
 *         type: number
 *       - in: query
 *         name: height
 *         type: number
 *     responses:
 *       200:
 *         description: Return image
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             data:
 *               type: object
 *               properties:
 *                 src:
 *                   type: string
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

const getImage = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array() });
    }

    const { url, width = 0, height = 0 } = req.query || {};
    let x = width,
      y = height;
    if (width) x = parseInt(width);
    if (height) y = parseInt(height);

    const fileName =
      url.replace(config.PINATA_GATEWAY, "") + "_" + height + "x" + width;
    const generateUrl = s3.generateURL(fileName);

    let isExists = false;
    await s3
      .getFile(fileName)
      .then((data) => {
        if (data) isExists = true;
      })
      .catch((e) => {
        isExists = false;
      });

    if (isExists) got.stream(generateUrl).pipe(res);
    else {
      try {
        let resizer;
        if (x !== 0 && y !== 0) resizer = sharp().resize(x, y);
        else if (y !== 0) resizer = sharp().resize({ height: y });
        else if (x !== 0) resizer = sharp().resize({ width: x });
        else resize = sharp();
        const stream = got.stream(url).on("error", (e) => {
          console.log(e);
          res.status(500).json({ success: false, message: msg.url_invalid });
        });

        const tempFilePath = __basedir + "/temp/" + fileName;
        const fileStream = fs.createWriteStream(tempFilePath);
        stream
          .pipe(resizer)
          .pipe(fileStream)
          .on("finish", async () => {
            try {
              const readStream = fs.createReadStream(tempFilePath);
              result = await s3.uploadStream(readStream, fileName);
              if (result.ETag) {
                fs.unlinkSync(tempFilePath);
                got.stream(generateUrl).pipe(res);
              } else
                res.status(500).json({
                  success: false,
                  message: msg.upload_scaled_image_s3_error,
                });
            } catch (e) {
              console.log(e);
              res.status(500).json({
                success: false,
                message: msg.upload_scaled_image_s3_error,
              });
            }
          })
          .on("error", (e) => {
            console.log(e);
            res.status(500).json({
              success: false,
              message: msg.write_scaled_image_error,
            });
          });
      } catch (e) {
        console.log(e);
        res.status(500).json({
          success: false,
          message: msg.write_scaled_image_error,
        });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: msg.server_error });
  }
};

module.exports = {
  connect,
  register,
  isUnique,
  getProfile,
  getUsers,
  checkAuth,
  getImage,
  update,
};
