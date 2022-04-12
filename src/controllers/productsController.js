import mongoose from 'mongoose';
import Product from "../models/ProductsModel";
import Comment from "../models/CommentsModel";

export const list = async (req, res) => {
   try {
      const products = await Product.find({ deleted: false }).populate("category").exec();
      return res.status(200).json(products);
   } catch (error) {
      return res.status(400).json({
         error: "Tìm sản phẩm thất bại",
      });
   }
};

export const createPro = async (req, res) => {
   try {
      const saveProduct = await new Product(req.body).save();
      const product = await saveProduct.populate("category");
      res.json(product);
   } catch (error) {
      res.status(400).json({
         message: error.message,
      })
   }

}
export const getDetail = async (req, res) => {
   try {
      const product = await Product.findOne({ _id: req.params.id }).populate("category").exec();

      return res.status(200).json(product);
   } catch (error) {
      res.status(400).json({
         error: `cant find product cuz ${error}`
      })
   }
}

export const getDetailBySlug = async (req, res) => {
   try {
      const product = await Product.findOne({ slug: req.params.slug }).populate("category").exec();
      return res.status(200).json(product);
   } catch (error) {
      return res.json(400).send({
         error: "Tìm sản phẩm thất bại",
      });
   }
}
export const remove = async (req, res, next) => {
   const product = await Product.deleteOne({ _id: req.params.id })
      .then((data) => res.json(data))
      .catch(next)
}

export const update = async (req, res) => {
   const condition = { _id: req.params.id }
   const update = req.body;
   try {
      const product = await Product.findOneAndUpdate(condition, update).exec();
      res.json(product);
   } catch (error) {
      res.status(400).json({
         error: "update sản phẩm không thành công"
      })
   }
}

