const Product = require("../models/product");
const Item = require("../models/item");
const Category = require("../models/category");
const Brand = require("../models/brand");

const { body, validationResult } = require("express-validator");
const category = require("../models/category");
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
               Promise.all([
                    Category.find({}).exec(),
                    Brand.find({}).exec()]
               ).then(([categories, brands]) => {
                    res.render("product/create", { title: "Create Product", categories: categories, brands: brands });
               }).catch((err) => {
                    res.render("error", { error: err });
               });
          },
          post: (req, res) => {
               if (req.body.category_selection) {
                    Promise.all([
                         Category.findById(req.body.category).exec(),
                         Brand.findById(req.body.brand).exec()
                    ]).then(([category, brand]) => {
                         res.render("product/create", { title: "Create Product", category: category, brand: brand });
                    }).catch((err) => {
                         res.render("error", { error: err });
                    });
               } else {
                    Category.findById(req.body.category).exec().then((category) => {
                         const stats = new Map();
                         category.statfields.forEach((field) => {
                              stats.set(field, req.body[field]);
                         });
                         console.log(stats);
                         const product = new Product({
                              name: req.body.name,
                              description: req.body.description,
                              price: req.body.price,
                              image: req.body.image,
                              brand: req.body.brand,
                              category: req.body.category,
                              warrenty: req.body.warrenty,
                              stats: stats,
                         });
                         product.save().then((product) => {
                              res.redirect(`/catalog/product/${product._id}`);
                         }).catch((err) => {
                              res.render("error", { error: err });
                         });
                    }).catch((err) => {
                         res.render("error", { error: err });
                    });
               }
          }
     },
     update: {
          get: (req, res) => {
               const id = req.params.id;
               Product.findById(id).populate("brand").populate("category").exec().then(
                    (product) => {
                         if (!product)
                              res.render("error", { error: "Product not found" });
                         else
                              res.render("product/create", { title: "Update Product", product: product, category: product.category, brand: product.brand });
                    }).catch((err) => {
                         res.render("error", { error: err });
                    });
          },
          post: (req, res) => {
               Category.findById(req.body.category).exec().then((category) => {
                    const stats = new Map();
                    category.statfields.forEach((field) => {
                         stats.set(field, req.body[field]);
                    });
                    const product = new Product({
                         name: req.body.name,
                         description: req.body.description,
                         price: req.body.price,
                         image: req.body.image,
                         brand: req.body.brand,
                         category: req.body.category,
                         warrenty: req.body.warrenty,
                         stats: stats,
                         _id: req.params.id,
                    });
                    Product.findByIdAndUpdate(req.params.id, product, {}).then((product) => {
                         res.redirect(`/catalog/product/${product._id}`);
                    });
               }).catch((err) => {
                    res.render("error", { error: err });
               });
          }
     },
     delete: {
          get: (req, res) => {
               Promise.all([
                    Product.findById(req.params.id).populate("brand").populate("category").exec(),
                    Item.find({ product: req.params.id }).exec()
               ]).then(([product, items]) => {
                    if (!product)
                         res.render("error", { error: "Product not found" });
                    else if (!items)
                         res.render("error", { error: "Items not found" });
                    else
                         res.render("product/delete", { product: product, items: items, title: product.name });
               }).catch((err) => {
                    res.render("error", { error: err });
               });
          },
          post: (req, res) => {
               Product.findByIdAndRemove(req.params.id).then(() => {
                    res.redirect("/catalog/product/list");
               }).catch((err) => {
                    res.render("error", { error: err });
               });
          }
     }
};
