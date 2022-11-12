const Category = require("../models/category");
const Brand = require("../models/brand");
const Product = require("../models/product");
const { body, validationResult } = require("express-validator");
exports.productController = {
     list: (req, res) => {
          Product.find({}, "name image price brand").sort({"name": 1}).populate("brand").exec().then((products) => {
               res.render("product/list", { title: "Product List", products: products });
          });
     },
     detail: (req, res) => {
          res.send("Product Details Not Yet Implemented");
     },
          create: {
     get: (req, res) => {
          res.send("Product Creation Get Not Yet Implemented");
     },
          post: (req, res) => {
               res.send("Product Creation Post Not Yet Implemented");
          }
},
update: {
     get: (req, res) => {
          res.send("Product Updation Get Not Yet Implemented");
     },
          post: (req, res) => {
               res.send("Product Updation Post Not Yet Implemented");
          }
},
delete: {
     get: (req, res) => {
          res.send("Product Deletion Get Not Yet Implemented");
     },
          post: (req, res) => {
               res.send("Product Deletion Post Not Yet Implemented");
          }
}
};
