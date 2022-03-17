import mongoose from 'mongoose';
import Product from "../models/ProductsModel";
// import Category from "../models/CategoryModel";

export const list = async (req, res) => {
   try {
      const product = await Product.find({});
      res.json(product);
   } catch (error) {
      console.log(error)
   }
}
export const create = async (req, res) => {
   try {
      const product = await new Product(req.body).save()
         .then((data) => res.json(data));
   } catch (error) {
      console.log(error)
   }

}
export const getDetail = async (req, res) => {
   try {
      const product = await Product.findOne({ slug: req.params.slug }).exec()
         .then((data) => res.json(data))

   } catch (error) {
      console.log(error)
   }
}
export const remove = async (req, res, next) => {
   const product = await Product.delete({ _id: req.params.id })
      .then((data) => res.json(data))
      .catch(next)
}

export const update = (req, res) => {
   const result = data.map(item => item.id == req.params.id ? req.body : item)
   res.json(result);
}

// export const ProductByCate = (req, res) => {

// }