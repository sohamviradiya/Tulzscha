const Category = require("../models/category");
const Product = require("../models/product");

exports.categoryController = {
     list: (req, res) => {
          res.send("Category List Not Yet Implemented")
     },
     detail: (req, res) => {
          res.send("Category Details Not Yet Implemented")
     },
     create: {
          get: (req, res) => {
               res.send("Category Creation Get Not Yet Implemented")
          },
          post: (req, res) => {
               res.send("Category Creation Post Not Yet Implemented")
          }
     },
     update: {
          get: (req, res) => {
               res.send("Category Updation Get Not Yet Implemented")
          },
          post: (req, res) => {
               res.send("Category Updation Post Not Yet Implemented")
          }
     },
     delete: {
          get: (req, res) => {
               res.send("Category Deletion Get Not Yet Implemented")
          },
          post: (req, res) => {
               res.send("Category Deletion Post Not Yet Implemented")
          }
     }
};
