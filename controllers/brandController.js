const Brand = require("../models/brand");
const Product = require("../models/product");
const { body, validationResult } = require("express-validator");

exports.brandController = {
     list: (req, res) => {
          Brand.find().exec().then((brands) => {
               res.render("brand/list", { brands, title: "Brands" });
          }).catch((err) => {
               res.render("error", { error: err });
          });
     },
     detail: (req, res) => {
          console.log('req.params.id', req.params.id);
          const id = req.params.id;
          Promise.all(
               [Brand.findById(id).exec(),
               Product.find({ brand: id }).exec()]).then(([brand, products]) => {
                    if (!brand)
                         res.render("error", { error: "Brand not found" });
                    else if (!products)
                         res.render("error", { error: "Products not found" });
                    else
                         res.render("brand/detail", { brand, products, title: brand.name });
               }).catch((err) => {
                    res.render("error", { error: err });
               });
     },
     create: {
          get: (req, res) => {
               res.render("brand/create", { title: "Create Brand" });
          },
          post: [body("company_name")
               .trim()
               .isLength({ min: 1 })
               .escape()
               .withMessage("company name must be specified.")
               .isAlphanumeric()
               .withMessage("company name has non-alphanumeric characters."),
          body("url").trim(),
          (req, res, next) => {
               const errors = validationResult(req);
               if (!errors.isEmpty()) {
                    res.render("brand/create", {
                         title: "Create Brand",
                         brand: req.body,
                         errors: errors.array(),
                    });
                    return;
               }
               const brand = new Brand({
                    company_name: req.body.company_name,
                    region: req.body.region,
                    logo: req.body.logo
               });
               brand.save((err) => {
                    if (err) {
                         debug(err);
                         return next(err);
                    }
                    res.redirect(`/catalog/brand/${brand.id}`);
               });
          }
          ]
     },
     update: {
          get: (req, res) => {
               Brand.findById(req.params.id).exec((err, brand) => {
                    if (err) {
                         debug(err);
                         return next(err);
                    }
                    if (brand == null) {
                         res.render("error", { title: "Brand not found", error: `Brand ${req.params.id} not found` });
                    } else {
                         res.render("brand/create", { title: "Update Brand", brand: brand });
                    }
               });
          },
          post: [body("company_name")
               .trim()
               .isLength({ min: 1 })
               .escape()
               .withMessage("company name must be specified.")
               .isAlphanumeric()
               .withMessage("company name has non-alphanumeric characters."),
          body("url").trim(),
               (req, res, next) => {
               console.log('req.body', req.body);
               const errors = validationResult(req);
               if (!errors.isEmpty()) {
                    res.render("brand/create", {
                         title: "Update Brand",
                         brand: req.body,
                         errors: errors.array(),
                    });
                    return;
               }
               const brand = new Brand({
                    company_name: req.body.company_name,
                    region: req.body.region,
                    logo: req.body.logo,
                    _id: req.params.id
               });
               Brand.findByIdAndUpdate(req.params.id, brand, {}, (err, updatedbrand) => {
                    if (err) {
                         return next(err);
                    }
                    res.redirect(`/catalog/brand/${updatedbrand.id}`);
               });
          }
          ]
     },
     delete: {
          get: (req, res) => {
               res.send("Brand Deletion Get Not Yet Implemented");
          },
          post: (req, res) => {
               res.send("Brand Deletion Post Not Yet Implemented");
          }
     }
};
