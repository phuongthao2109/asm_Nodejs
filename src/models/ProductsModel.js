const mongooseDelete = require('mongoose-delete');
import mongoose from "mongoose";
import slug from "mongoose-slug-generator";
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Types;

const Product = new Schema({
  name_product: { type: String, maxLength: 255, required: true, minLength: 5 },
  desc: { type: String, minLength: 5,default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean venenatis dapibus aliquet. Pellentesque suscipit metus odio, sit amet congue urna dapibus eu. Cras ultrices diam sit amet sodales consectetur. Donec eu placerat ipsum, non dignissim risus. Pellentesque dui est, pharetra non dui ut, efficitur gravida sapien. Duis semper lacus quis magna posuere volutpat. Fusce sem quam, efficitur sit amet erat sit amet, egestas aliquam neque. Ut nec aliquet lectus. Nam ipsum ipsum, consequat ac imperdiet ac, mattis sit amet lacus. Pellentesque fringilla eleifend rutrum. Donec fringilla quam est, et cursus elit finibus et. Vestibulum fermentum euismod diam at imperdiet.'},
  image: { type: Object},
  slug: { type: String, slug: 'name_product', unique: true },
  price: { type: String, required: true },
  category: { type: ObjectId, ref: "Category" },
  short_desc: { type: String, default: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean venenatis dapibus aliquet. Pellentesque suscipit metus odio, sit amet congue urna dapibus eu. Cras ultrices diam sit amet sodales consectetur. Donec eu placerat ipsum, non dignissim risus. Pellentesque dui est, pharetra non dui ut, efficitur gravida sapien. Duis semper lacus quis magna posuere volutpat. Fusce sem quam, efficitur sit amet erat sit amet, egestas aliquam neque. Ut nec aliquet lectus. Nam ipsum ipsum, consequat ac imperdiet ac, mattis sit amet lacus. Pellentesque fringilla eleifend rutrum" },
  quantity: { type: String },
  stock: { type: Number},
  discount: { type: Number},  
  priceAfterDiscount: { type: Number},
}, { timestamps: true });


mongoose.plugin(slug);
Product.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

module.exports = mongoose.model('Product', Product)