const mongooseDelete = require('mongoose-delete');
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Types;

const Slider = new Schema({
   slidername: { type: String, },
   image: { type: Object},
   urlink: { type: String, },
}, { timestamps: true });



Slider.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

module.exports = mongoose.model('Slider', Slider)