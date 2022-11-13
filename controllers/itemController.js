const Product = require("../models/product");
const Item = require("../models/item");

exports.itemController = {
     list: (req, res) => {
          Item.find().populate("product").exec().then((items) => {
               res.render("item/list", { items, title: "Items" });
          }).catch((err) => {
               res.render("error", { error: err });
          });
     },
     detail: (req, res) => {
          Item.findById(req.params.id).populate("product").exec().then((item) => {
               res.render("item/detail", { item: item, title: item.product.name });
          }).catch((err) => {
               res.render("error", { error: err });
          });
     },
     create: {
          get: (req, res) => {
               Product.find().exec().then((products) => {
                    res.render("item/create", { products, title: "Create Item" });
               }).catch((err) => {
                    res.render("error", { error: err });
               });
          },
          post: (req, res) => {
               const item = new Item({
                    product: req.body.product,
                    status: req.body.status,
                    manufactringDate: new Date(...req.body.manufactringDate.split("-"))
               });
               item.save().then(() => {
                    res.redirect(`/catalog/item/${item._id}`);
               }).catch((err) => {
                    res.render("error", { error: err });
               });
          }
     },
     update: {
          get: (req, res) => {
               Item.findById(req.params.id).populate("product").exec().then((item) => {
                    if (item == null) {
                         res.render("error", { error: new Error("Item not found") });
                         return;
                    }
                    const manufactringDate = item.manufactringDate.toISOString().split("T")[0];
                    console.log(manufactringDate);
                    Product.find().exec().then((products) => {
                         console.log(item);
                              res.render("item/create", { item,manufactringDate, products, title: "Update Item" });
                    }).catch((err) => {
                         res.render("error", { error: err });
                    });
               }).catch((err) => {
                    res.render("error", { error: err });
               });
          },
          post: (req, res,next) => {
               const item = {
                    product: req.body.product,
                    status: req.body.status,
                    manufactringDate: new Date(...req.body.manufactringDate.split("-")),
                    _id: req.params.id
               };
               Item.findByIdAndUpdate(req.params.id, item, {}, (err, updated_item) => {
                    if (err) {
                         return next(err);
                    }
                    res.redirect(`/catalog/item/${updated_item._id}`);
               });
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
