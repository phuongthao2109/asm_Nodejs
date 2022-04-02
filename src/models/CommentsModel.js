const mongooseDelete = require('mongoose-delete');
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Types;

const Comment = new Schema({
   user: { type: ObjectId, ref: "User" },
   product: { type: ObjectId, ref: "Product" },
   content: { type: String, },
   status: { type: String, }
}, { timestamps: true });



Comment.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

module.exports = mongoose.model('Comment', Comment)