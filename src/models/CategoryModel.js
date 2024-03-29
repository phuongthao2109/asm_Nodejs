
import mongoose from "mongoose";
import slug from "mongoose-slug-generator";
const Schema = mongoose.Schema;

const Category = new Schema({
  catename: { type: String, required: true },
  slug: { type: String, slug: 'catename', unique: true },
  status: { type: String },
  description: { type: String },
  short_description: { type: String },
  url: { type: String },
  image: { type: Object }
}, { timestamps: true });


mongoose.plugin(slug);

module.exports = mongoose.model('Category', Category)