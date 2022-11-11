const mangoose = require("mongoose");
const Schema = mangoose.Schema;

const BrandSchema = new Schema({
     company_name: { type: String, required: true, maxLength: 100 },
     region: { type: String, required: true, enum: ["eu", "us", "cn", "in", "ru", "jp", "uk", "za", "au"] },
});

BrandSchema.virtual("customer_support").get(function () {
     let email = "";
     if (this.company_name) {
          email = "info@" + (this.company_name).toLowerCase().replace(" ", "_") + "." + this.region;
     }
     return email;
});

BrandSchema.virtual("website").get(function () {
     let url = "";
     if (this.company_name) {
          url = "home." + (this.company_name).toLowerCase().replace(" ", "_") + "." + this.region;
     }
     return url;
});

module.exports = mangoose.model("Brand", BrandSchema);