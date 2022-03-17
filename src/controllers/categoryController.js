import mongoose from 'mongoose';
import Category from "../models/CategoryModel";
import Product from "../models/ProductsModel";

export const create = async (req, res) => {
   try {
      const category = await new Category(req.body).save()
         .then((data) => res.json(data));
   } catch (error) {
      console.log(error)
   }

}

export const list = async (req, res) => {
   try {
      const category = await Category.find({})
         .then((data) =>  res.render('admin/Category/list'))
     
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


export const remove = async (req, res, next) => {
   const category = await Category.deleteOne({ _id: req.params.id })
      .then((data) => res.json(data))
      .catch(next)
}