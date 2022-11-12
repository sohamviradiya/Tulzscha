const Product = require("../models/product");
const Item = require("../models/item");
const { body, validationResult } = require("express-validator");
exports.productController = {
     list: (req, res) => {
          Product.find({}, "name image price brand").sort({ "name": 1 }).populate("brand").exec().then((products) => {
               res.render("product/list", { title: "Product List", products: products });
          });
     },
     detail: (req, res) => {
          const id = req.params.id;
          Promise.all([Product.findById(id).populate("brand").populate("category").exec(),
               Item.find({ product: id }).exec()]).then(([product, items]) => {
                    if (!product)
                         res.render("error", { error: "Product not found" });
                    else if (!items)
                         res.render("error", { error: "Items not found" });
                    else
                         res.render("product/detail", { product: product, items: items, title: product.name });
               }).catch((err) => {
                    res.render("error", { error: err });
               });
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
