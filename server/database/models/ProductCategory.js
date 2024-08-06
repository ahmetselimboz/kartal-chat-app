const mongoose = require("mongoose");
const User = require("./Users");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    name:{type:String, unique:true}
  },
  { timestamps: true, versionKey: false }
);

const ProductCategory = mongoose.model("ProductCategory", schema);
module.exports = ProductCategory;
