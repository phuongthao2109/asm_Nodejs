const mongooseDelete = require('mongoose-delete');
import mongoose from "mongoose";
import slug from "mongoose-slug-generator";
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Types;

const Product = new Schema({
  name_product: { type: String, maxLength: 255, required: true, minLength: 5 },
  desc: { type: String, maxLength: 600, minLength: 5 },
  image: { type: String, maxLength: 255 },
  slug: { type: String, slug: 'name_product', unique: true },
  price: { type: String, required: true },
  category: { type: ObjectId, ref: "Category" },
  short_desc: { type: String },
  quantity: { type: String, required: true }
}, { timestamps: true });


mongoose.plugin(slug);
Product.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

module.exports = mongoose.model('Product', Product)