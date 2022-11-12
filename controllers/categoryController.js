const Category = require("../models/category");
const Product = require("../models/product");

exports.categoryController = {
     list: (req, res) => {
          Category.find().exec().then((categories) => {
               res.render("category/list", { categories, title: "Categories" });
          }).catch((err) => {
               console.log(err);
               res.render("error", { error: err });
          });
     },
     detail: (req, res) => {
          console.log('req.params.id', req.params.id);
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
               res.send("Category Creation Get Not Yet Implemented");
          },
          post: (req, res) => {
               res.send("Category Creation Post Not Yet Implemented");
          }
     },
     update: {
          get: (req, res) => {
               res.send("Category Updation Get Not Yet Implemented");
          },
          post: (req, res) => {
               res.send("Category Updation Post Not Yet Implemented");
          }
     },
     delete: {
          get: (req, res) => {
               res.send("Category Deletion Get Not Yet Implemented");
          },
          post: (req, res) => {
               res.send("Category Deletion Post Not Yet Implemented");
          }
     }
};
