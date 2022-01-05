const { validationResult } = require("express-validator");
const Category = require("../models/category");
const msg = require("../utils/message");

/**
 * @swagger
 *
 * /category/create:
 *   post:
 *     security:
 *       - Bearer: []
 *     summary: Create a category
 *     description: Create a category
 *     tags:
 *       - Category
 *     parameters:
 *       - in: body
 *         schema:
 *           type: object
 *           required:
 *             label:
 *               type: string
 *             value:
 *               type: string
 *           properties:
 *             label:
 *               type: string
 *             value:
 *               type: string
 *     responses:
 *       200:
 *         description: Return result status
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

const create = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array() });
    }
    const { label, value } = req.body;
    const category = new Category({ label, value });
    await category.save();

    res.send({ success: true });
  } catch (e) {
    res
      .status(500)
      .json({ success: false, message: msg.server_error, error: e.toString() });
  }
};

/**
 * @swagger
 *
 * /category/list:
 *   get:
 *     summary: Fetch category list
 *     description: Fetch category list
 *     tags:
 *       - Category
 *     parameters:
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
 *         enum: [label, value]
 *         required: false
 *       - in: query
 *         name: sortOrder
 *         type: string
 *         enum: [asc, desc]
 *         required: false
 *     responses:
 *       200:
 *         description: Return list
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             data:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   label:
 *                     type: string
 *                   value:
 *                     type: string
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

const list = async (req, res) => {
  try {
    const {
      limit = 20,
      skip = 0,
      sortBy = "itemId",
      sortOrder = "asc",
    } = req.query || {};

    const data =
      (await Category.find(
        {},
        {},
        {
          sort: { [sortBy]: sortOrder.toLowerCase() === "asc" ? 1 : -1 },
          limit: parseInt(limit),
          skip: parseInt(skip),
        }
      ).lean()) || [];
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
 * /category/delete/:id:
 *   delete:
 *     security:
 *       - Bearer: []
 *     summary: Delete a category
 *     description: Delete a category
 *     tags:
 *       - Category
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Return result status
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

const remove = async (req, res) => {
  try {
    const { id } = req.params || {};
    await Category.remove({ _id: id });
    res.send({ success: true });
  } catch (e) {
    res
      .status(500)
      .json({ success: false, message: msg.server_error, error: e.toString() });
  }
};

module.exports = {
  create,
  list,
  remove,
};
