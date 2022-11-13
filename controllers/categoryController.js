const Category = require("../models/category");
const Product = require("../models/product");
const { body, validationResult } = require("express-validator");

exports.categoryController = {
     list: (req, res) => {
          Category.find().exec().then((categories) => {
               res.render("category/list", { categories, title: "Categories" });
          }).catch((err) => {
               res.render("error", { error: err });
          });
     },
     detail: (req, res) => {
          const id = req.params.id;
          Promise.all(
               [Category.findById(id).exec(),
               Product.find({ category: id }).populate("brand").exec()]).then(([category, products]) => {
                    if (!category)
                         res.render("error", { error: "Category not found" });
                    else if (!products)
                         res.render("error", { error: "Products not found" });
                    else
                         res.render("category/detail", { category: category, products, title: category.name });
               }).catch((err) => {
                    res.render("error", { error: err });
               });
     },
     create: {
          get: (req, res) => {
               res.render("category/create", { title: "Create Category" });
          },
          post: [body("name")
               .trim()
               .isLength({ min: 1 })
               .escape()
               .withMessage("category name must be specified.")
               .isAlphanumeric()
               .withMessage("category name has non-alphanumeric characters."),
          body("statfields").trim().escape().replace(" ", "_"),
          (req, res, next) => {
               req.body.statfields = req.body.statfields.split(",");
               const errors = validationResult(req);
               if (!errors.isEmpty()) {
                    res.render("category/create", {
                         title: "Create Category",
                         category: req.body,
                         errors: errors.array(),
                    });
                    return;
               }
               const category = new Category({
                    name: req.body.name,
                    statfields: req.body.statfields
               });
               category.save((err) => {
                    if (err) {
                         return next(err);
                    }
                    res.redirect(`/catalog/category/${category.id}`);
               });
          }]
     },
     update: {
          get: (req, res) => {
               Category.findById(req.params.id).exec().then((category) => {
                    if (!category)
                         res.render("error", { error: "Category not found" });
                    else
                         res.render("category/create", { category, title: "Update Category" });
               }
               ).catch((err) => {
                    res.render("error", { error: err });
               });
          },
          post: [body("name")
               .trim()
               .isLength({ min: 1 })
               .escape()
               .withMessage("category name must be specified.")
               .isAlphanumeric()
               .withMessage("category name has non-alphanumeric characters."),
          body("statfields").trim().escape().replace(" ", "_"),
          (req, res, next) => {
               req.body.statfields = req.body.statfields.split(",");
               const errors = validationResult(req);
               if (!errors.isEmpty()) {
                    res.render("category/create", {
                         title: "Create Category",
                         category: req.body,
                         errors: errors.array(),
                    });
                    return;
               }
               const category = new Category({
                    name: req.body.name,
                    statfields: req.body.statfields,
                    _id: req.params.id
               });
               Category.findByIdAndUpdate(req.params.id, category, {}, (err, updated_category) => {
                    if (err) {
                         return next(err);
                    }
                    res.redirect(`/catalog/category/${updated_category.id}`);
               });
          }]
     },
     delete: {
          get: (req, res) => {
               Promise.all([
                    Category.findById(req.params.id).exec(),
                    Product.find({ category: req.params.id }).exec()
               ]).then(([category, products]) => {
                    res.render("category/delete", { category, products, title: "Delete Category" });
               }).catch((err) => {
                    res.render("error", { error: err });
               });
          },
          post: (req, res) => {
               Category.findByIdAndDelete(req.params.id, {}, (err) => {
                    if (err)
                         res.render("error", { error: err });
                    else
                         res.redirect("/catalog/category/list");
               });
          }
     }
};
