const Product = require("../models/Product");

const insertSimpleProducts = async (req, res) => {
  try {
    const simpleProducts = [
      {
        name: "Wireless Bluetooth Earbuds",
        category: "Electronics",
        price: 59.99,
        inStock: true,
        tags: ["wireless", "audio", "bluetooth"],
      },
      {
        name: "Organic Green Tea",
        category: "Food & Beverage",
        price: 9.99,
        inStock: true,
        tags: ["organic", "tea", "healthy"],
      },
      {
        name: "Leather Office Chair",
        category: "Furniture",
        price: 199.99,
        inStock: false,
        tags: ["office", "chair", "leather"],
      },
      {
        name: "Smart LED Bulb",
        category: "Home Automation",
        price: 29.99,
        inStock: true,
        tags: ["smart", "lighting", "energy-saving"],
      },
      {
        name: "Yoga Mat",
        category: "Fitness",
        price: 24.99,
        inStock: true,
        tags: ["yoga", "fitness", "exercise"],
      },
      {
        name: "Wireless Gaming Mouse",
        category: "Gaming",
        price: 79.99,
        inStock: true,
        tags: ["gaming", "mouse", "wireless"],
      },
      {
        name: "Stainless Steel Water Bottle",
        category: "Kitchen",
        price: 19.99,
        inStock: false,
        tags: ["water bottle", "stainless steel", "eco-friendly"],
      },
      {
        name: "Noise-Canceling Headphones",
        category: "Electronics",
        price: 149.99,
        inStock: true,
        tags: ["audio", "headphones", "noise-canceling"],
      },
      {
        name: "Electric Kettle",
        category: "Kitchen",
        price: 39.99,
        inStock: true,
        tags: ["kettle", "kitchen", "electric"],
      },
      {
        name: "Running Shoes",
        category: "Footwear",
        price: 89.99,
        inStock: true,
        tags: ["running", "shoes", "sports"],
      },
    ];

    const result = await Product.insertMany(simpleProducts);
    res.status(201).json({
      success: true,
      message: `Insert ${result.length} to db successfully.`,
      data: result,
    });
  } catch (error) {
    console.log("error in insertSimpleProducts controller:->".error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const getProductsAnalysis = async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $match: {
          category: "Electronics",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$price",
          },
          avgPrice: {
            $avg: "$price",
          },
          maxProductPrice: {
            $max: "$price",
          },
          minProductPrice: {
            $min: "$price",
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalRevenue: 1,
          avgPrice: 1,
          maxProductPrice: 1,
          minProductPrice: 1,
          priceRange: {
            $subtract: ["$maxProductPrice","$minProductPrice"]
          }
        }
      }
    ]);
    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log("error in getProductsAnalysis controller:->", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const getProductStats = async (req, res) => {
  try {
    const result = await Product.aggregate([
      //stage 1: filter documents
      {
        $match: {
          inStock: true,
          price: {
            $gte: 50,
          },
        },
      },
      //stage 2: group documents
      {
        $group: {
          _id: "$category",
          avgPrice: {
            $avg: "$price",
          },
          count: {
            $sum: 1,
          },
        },
      },
    ]);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.log("error in getProductStats controller:->", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

module.exports = { insertSimpleProducts, getProductStats, getProductsAnalysis };
