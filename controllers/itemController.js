const Product = require("../models/product");
const Item = require("../models/item");

exports.itemController = {
     list: (req, res) => {
          Item.find().populate("product").exec().then((items) => {
               res.render("item/list", { items, title: "Items" });
          });
     },
     detail: (req, res) => {
          res.send("Item Details Not Yet Implemented");
     },
     create: {
          get: (req, res) => {
               res.send("Item Creation Get Not Yet Implemented");
          },
          post: (req, res) => {
               res.send("Item Creation Post Not Yet Implemented");
          }
     },
     update: {
          get: (req, res) => {
               res.send("Item Updation Get Not Yet Implemented");
          },
          post: (req, res) => {
               res.send("Item Updation Post Not Yet Implemented");
          }
     },
     delete: {
          get: (req, res) => {
               res.send("Item Deletion Get Not Yet Implemented");
          },
          post: (req, res) => {
               res.send("Item Deletion Post Not Yet Implemented");
          }
     }
};
