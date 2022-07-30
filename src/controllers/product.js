const { check, validationResult } = require('express-validator');

const database = require('../config/db');
const Product = require('../models/product');

module.exports = {
  index: async (req, res, next) => {
    try {
      await database.sync();
      const products = await Product.findAll();
      if (!products) {
        return res.status(404).json({
          errors: [
            {
              success: false,
              message: 'No product found',
            },
          ],
        });
      }
      res.status(200).json(products);
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error });
    }
  },

  store: [
    check('name', 'Name is required').not().isEmpty(),
    check('price', 'Price is required').not().isEmpty().isAlphanumeric(),
    check('description', 'Description is required').not().isEmpty(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { name, price, description } = req.body;
      try {
        await database.sync();
        const result = await Product.create({
          name,
          price,
          description,
        });
        if (result) return res.status(200).json(result);
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error });
      }
    },
  ],

  show: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({
          errors: [
            {
              success: false,
              message: 'Product not found',
            },
          ],
        });
      }
      res.status(200).json({ success: true, product });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error });
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      // Product.destroy({ where: { id: 1 } });
      //or
      const product = await Product.findByPk(id);
      if (!product) {
        return res
          .status(404)
          .json({ success: true, message: 'Product not found' });
      }
      product.destroy();
      res.status(200).json({ success: true, product });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error });
    }
  },

  update: [
    check('name', 'Name is required').not().isEmpty(),
    check('price', 'Price is required').not().isEmpty().isAlphanumeric(),
    check('description', 'Description is required').not().isEmpty(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
        const id = req.params.id;
        const product = await Product.findByPk(id);
        const { name, price, description } = req.body;
        const updateProduct = {
          name,
          price,
          description,
        };
        if (!product) {
          return res
            .status(404)
            .json({ success: true, message: 'Product not found' });
        }
        product.set(updateProduct);
        const result = await product.save();
        if (result) {
          return res
            .status(200)
            .json({ success: true, message: 'Product updated successfully' });
        }
      } catch (err) {
        console.log(err);
        res.status(404).json({
          errors: [
            {
              success: false,
              message: 'User not found',
            },
          ],
        });
      }
    },
  ],
};
