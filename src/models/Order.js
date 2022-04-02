const mongooseDelete = require('mongoose-delete');
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Types;

const Order = new Schema({
   orderCode: String,
   orderedBy: {
      type: ObjectId,
      ref: "User",
   },
   shippingInfo: {
      phoneNumber: String,
      address: String,
      note: String,
   },
   orderProducts: [
      {
         product: { type: ObjectId, ref: "Product" },
         quantity: Number,
         totalPrice: Number,
      },
   ],
   orderStatus: {
      type: String,
      enum: ["pending", "confirm", "delivered", "done", "close"],
      default: "pending",
   },
   orderTotal: Number,
   orderTotalAfterDiscount: Number,
},
   { timestamps: true }
);



Order.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

module.exports = mongoose.model('Order', Order)