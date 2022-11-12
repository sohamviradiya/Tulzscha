const mangoose = require("mongoose");
const Schema = mangoose.Schema;

const BrandSchema = new Schema({
     company_name: { type: String, required: true, maxLength: 100 },
     region: { type: String, default: "us", enum: ["eu", "us", "cn", "in", "ru", "jp", "uk", "za", "au"] },
     logo: { type: String },
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

BrandSchema.virtual("country").get(function () {
     let country = "";
     switch (this.region) {
          case "eu":
               country = "Europe";
               break;
          case "us":
               country = "United States";
               break;
          case "cn":
               country = "China";
               break;
          case "in":
               country = "India";
               break;
          case "ru":
               country = "Russia";
               break;
          case "jp":
               country = "Japan";
               break;
          case "uk":
               country = "UK";
               break;
          case "za":
               country = "South Africa";
               break;
          case "au":
               country = "Australia";
               break;
          default:
               country = "Unknown";
               break;
     }
     return country;
});

module.exports = mangoose.model("Brand", BrandSchema);