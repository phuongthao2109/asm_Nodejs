 const mongooseDelete = require('mongoose-delete');
import mongoose from "mongoose";
import slug from "mongoose-slug-generator";
const Schema = mongoose.Schema;
const Product = new Schema({
   name: {type: String,maxLength:255,required:true},
   desc: {type: String,maxLength:600},
   image: {type: String,maxLength:255},
   slug : {type: String,slug:'name',unique:true},
 },{timestamps: true});


 mongoose.plugin(slug);
 Product.plugin(mongooseDelete,{deletedAt : true, overrideMethods: 'all'});
 
module.exports = mongoose.model('Product', Product)