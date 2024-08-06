const mongoose = require("mongoose");
const User = require("./Users");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    name:{type:String},
    imageUrl:{type:String},
    price: {type:String},
    categoryId: {type:mongoose.Schema.Types.ObjectId, ref: "ProductCategory"},

  },
  { timestamps: true, versionKey: false }
);

const Product = mongoose.model("Product", schema);
module.exports = Product;
