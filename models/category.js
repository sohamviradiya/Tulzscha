const mangoose = require("mongoose");
const Schema = mangoose.Schema;

const CategorySchema = new Schema({
     name: { type: String, required: true, maxLength: 100 },
     statfields: { type: [String], required: true },
});

module.exports = mangoose.model("Category", CategorySchema);