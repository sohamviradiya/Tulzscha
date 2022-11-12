const mangoose = require("mongoose");
const Schema = mangoose.Schema;

const ProductSchema = new Schema({
     name: { type: String, required: true, maxLength: 100 },
     brand: { type: Schema.Types.ObjectId, ref: "Brand" },
     price: { type: Number, required: true, min: 0 },
     category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
     description: { type: String, maxLength: 1000 },
     warrenty: { type: Number, min: 0 },
     image: { type: String },
     stats: { type: Map, of: String },
});

module.exports = mangoose.model("Product", ProductSchema);