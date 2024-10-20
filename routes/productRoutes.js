const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const Product = require("../models/Product");
const router = express.Router();

// Utility function to fetch product details from Flipkart Ecommerce
const fetchProductDetails = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const price = $("h4.biMVPh").text();
    const title = $("span.fhfLdV").text();
    const description = $("p.guezwa").text();
    const review = $("span.laVOtN").text();
    const image = $("div.iEMJCd img").attr("src");

    return {
      price,
      title,
      description,
      review,
      image,
    };
  } catch (error) {
    console.log(error);
  }
};

// POST - Add a new product
router.post("/add", async (req, res) => {
  try {
    const { url } = req.body;
    const { price, title, description, review, image } =
      await fetchProductDetails(url);
    const date = new Date();

    let modified_price = price.slice(1, price.length);
    modified_price = parseInt(modified_price);

    const priceHistory = {
      price: modified_price,
      date,
    };

    const data = {
      title: title,
      description: description,
      url: url,
      currentPrice: modified_price,
      reviews: parseFloat(review),
      priceHistory: [priceHistory],
      image,
    };

    console.log(image);

    let present_data = await Product.findOne({ title: title });
    if (present_data) {
      present_data.priceHistory.push(priceHistory);
      present_data.image = image;
      await present_data.save();
    } else {
      present_data = await Product.create(data);
      console.log(present_data);
    }

    res.status(201).json({
      success: true,
      message: "Product successfully added!",
      data: present_data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch product details" });
  }
});

// GET - Get all products with optional filters
router.get("/products", async (req, res) => {
  const { title, minPrice, maxPrice } = req.query;
  const filter = {};

  if (title) filter.title = { $regex: title, $options: "i" };
  if (minPrice) filter.currentPrice = { $gte: minPrice };
  if (maxPrice)
    filter.currentPrice = { ...filter.currentPrice, $lte: maxPrice };

  const products = await Product.find(filter);
  res.json(products);
});

// PUT - Recheck price and update history
router.put("/recheck/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const productDetails = await fetchProductDetails(product.url);
    product.currentPrice = productDetails.currentPrice;
    product.priceHistory.push({ price: productDetails.currentPrice });
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to update product" });
  }
});

module.exports = router;
