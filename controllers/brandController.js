const Brand = require("../models/brand");
const Product = require("../models/product");

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
                    console.log('err', err);
                    res.render("error", { error: err });
               });
     },
     create: {
          get: (req, res) => {
               res.send("Brand Creation Get Not Yet Implemented");
          },
          post: (req, res) => {
               res.send("Brand Creation Post Not Yet Implemented");
          }
     },
     update: {
          get: (req, res) => {
               res.send("Brand Updation Get Not Yet Implemented");
          },
          post: (req, res) => {
               res.send("Brand Updation Post Not Yet Implemented");
          }
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
