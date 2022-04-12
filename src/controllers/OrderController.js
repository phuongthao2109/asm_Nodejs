import mongoose from 'mongoose';
import Order from '../models/Order';
import User from "../models/UsersModel";
import shortid from "shortid";

export const createOrder = async (req, res) => {
   try {
      const { orderedBy, shippingInfo, orderProducts, orderStatus, orderTotal } = req.body;
      const payload = {
         orderCode: shortid.generate(),
         orderedBy,
         shippingInfo,
         orderProducts,
         orderStatus,
         orderTotal,
      };

      const order = await new Order(payload).save();

      return res.status(201).json(order);
   } catch (error) {
      return res.status(400).json({
         error: "Thêm đơn hàng thất bại",
      });
   }
};

export const findAllOrder = async (req, res) => {
   try {
      const orders = await Order.find({}).exec();
      return res.status(200).json(orders);
   } catch (error) {
      return res.status(400).json({
         error: "Load Order List Fail ",
      });
   }
};

export const updateOrder = async (req, res) => {
   try {
      const { orderedBy, shippingInfo, orderProducts, orderStatus, orderTotal, orderTotalAfterDiscount } = req.body;

      const payload = {
         orderedBy,
         shippingInfo,
         orderProducts,
         orderStatus,
         orderTotal,
         orderTotalAfterDiscount,
      };

      const order = await Order.findOneAndUpdate({ _id: req.params.orderId }, { $set: payload }, { new: true }).exec();

      return res.status(201).json(order);
   } catch (error) {
      return res.status(400).json({
         error: "Cập nhật đơn hàng thất bại",
      });
   }
};

export const deleteOneOrder = async (req, res) => {
   try {
      const order = await Order.findOneAndDelete({ _id: req.params.orderId }).exec();
      return res.status(200).json(order);
   } catch (error) {
      return res.status(400).json({
         error: "Xoá đơn hàng thất bại",
      });
   }
};

export const sorfDeleteOrder = async (req, res, next) => {
   try {
      const order = await Order.delete({ _id: req.params.orderId }).exec();
      return res.status(200).json(order);
   } catch (error) {
      return res.status(400).json({
         error: "Xoá đơn hàng thất bại",
      });
   }
}
export const restoreOrder = async (req, res) => {
   try {
      const userId = req.auth._id;
      const orders = await Order.restore({ orderedBy: userId }).exec();
      return res.status(200).json(orders);
   } catch (error) {
      return res.status(400).json({
         error: "Tìm đơn hàng thất bại",
      });
   }
}


export const findOneOrder = async (req, res) => {
   try {
      const order = await Order.findOne({ _id: req.params.orderId }).exec();
      return res.status(200).json(order);
   } catch (error) {
      return res.status(400).json({
         error: "Tìm đơn hàng thất bại",
      });
   }
};

export const userFindOrderList = async (req, res) => {
   try {
      const userId = req.auth._id;
      const orders = await Order.find({ orderedBy: userId }).exec();
      return res.status(200).json(orders);
   } catch (error) {
      return res.status(400).json({
         error: "Tìm đơn hàng thất bại",
      });
   }
};

