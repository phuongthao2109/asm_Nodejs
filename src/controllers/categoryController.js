import mongoose from 'mongoose';
import Category from "../models/CategoryModel";
import Product from "../models/ProductsModel";

export const create = async (req, res) => {
   try {
      const category = await new Category(req.body).save()
         .then((data) => res.json(data));
   } catch (error) {
      console.log("error :" +error.message)
   }

}

export const list = async (req, res) => {
   try {
      const category = await Category.find()
         .then((data) =>  res.json(data))
     
   } catch (error) {
      console.log(error)
   }
}

export const listCateActive = async (req, res) => {
   try {
      const category = await Category.find({status:'active'})
         .then((data) =>  res.json(data))
     
   } catch (error) {
      console.log(error)
   }
}

export const getDetail = async (req, res) => {
   const condition = { slug: req.params.slug };
   try {
      const category = await Category.findOne(condition).exec();
      const products = await Product.find({ category }).select('-category').exec();
      res.json({
         category, products
      });
   } catch (error) {
      console.log(error)
   }
}
export const getDetailById = async (req, res) => {
   const condition = { _id: req.params.id };
   try {
      const category = await Category.findOne(condition).exec();
      res.json(category);
   } catch (error) {
      console.log(error)
   }
}

export const remove = async (req, res, next) => {
   const category = await Category.deleteOne({ _id: req.params.id })
      .then((data) => res.json(data))
      .catch(next)
}

export const update = async (req, res) => {
   const condition = { _id: req.params.id }
   const update = req.body;
   try {
      const category = await Category.findOneAndUpdate(condition, update).exec();
      res.json(category);
   } catch (error) {
      res.status(400).json({
         error: "update cate không thành công"
      })
   }
}
