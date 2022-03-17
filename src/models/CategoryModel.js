
import mongoose from "mongoose";
import slug from "mongoose-slug-generator";
const Schema = mongoose.Schema;

const Category = new Schema({
   name: {type: String,maxLength:255,required:true,minLength:5},
   slug : {type: String,slug:'name',unique:true},
 },{timestamps: true});


 mongoose.plugin(slug);
 
module.exports = mongoose.model('Category', Category)