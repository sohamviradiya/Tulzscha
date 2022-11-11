const mangoose = require("mongoose");
const Schema = mangoose.Schema;

const ItemSchema = new Schema({
     product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
     status: { type: String, required: true, enum: ["Available", "Sold", "Pending", "Defective"], default: "Available" },
     manufactringDate: { type: Date, required: true },
});

module.exports = mangoose.model("Item", ItemSchema);