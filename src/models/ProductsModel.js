 const mongooseDelete = require('mongoose-delete');
import mongoose from "mongoose";
import slug from "mongoose-slug-generator";
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Types;

const Product = new Schema({
   name: {type: String,maxLength:255,required:true,minLength:5},
   desc: {type: String,maxLength:600,minLength:5},
   image: {type: String,maxLength:255},
   slug : {type: String,slug:'name',unique:true},
   price: {type: Number,required:true},
   category: { type: ObjectId, ref: "Category"}
 },{timestamps: true});


 mongoose.plugin(slug);
 Product.plugin(mongooseDelete,{deletedAt : true, overrideMethods: 'all'});
 
module.exports = mongoose.model('Product', Product)