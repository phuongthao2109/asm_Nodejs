import mongoose from 'mongoose';
import Comment from "../models/CommentsModel";
import Product from "../models/ProductsModel";

export const createComment = async (req, res) => {
   try {
      const comment = await new Comment(req.body).save()
      return res.status(200).json(comment);
   } catch (error) {
      console.log(error)
   }

}

export const listCmt = async (req, res) => {
   try {
      
      const comments = await Comment.find({}).populate("user").populate("product").exec();
      return res.status(200).json({comments,countCmt});
   } catch (error) {
      return res.status(400).json({
         error: "Tìm comment thất bại",
      });
   }
};

export const countCmt = (req, res) => {
   const data  = countDocuments(listCmt(comments))
   return res.status(200).json(data)
}
export const getDetail = async (req, res) => {
   try {
      const comment = await Comment.findOne({ _id: req.params.id }).populate("user").populate("product").exec();
      return res.status(200).json(comment);
   } catch (error) {
      res.status(400).json({
         error: `cant find comment cuz ${error}`
      })
   }
}

export const updateCmt = async (req, res) => {
   const condition = { _id: req.params.id }
   const update = req.body;
   try {
      const comment = await Comment.findOneAndUpdate(condition, update).exec();
      res.json(comment)
   } catch (error) {
      return res.status(400).json({
         error: "update comment thất bại",
      });
   }
}

export const sorfDelete = async (req, res, next) => {
   const product = await Comment.delete({ _id: req.params.id })
      .then((data) => res.json(data))
      .catch(next)
}

export const forceRemove = async (req, res, next) => {
   const product = await Comment.deleteOne({ _id: req.params.id })
      .then((data) => res.json(data))
      .catch(next)
}

export const restoreCmt = async (req, res) => {
   try {
      const comment = await Comment.restore({ _id: req.params.id })
      res.json(comment)
   } catch (error) {
      return res.status(400).json({
         error: "restore comment thất bại",
      });
   }
}

export const countCmtByProductId = async (req, res) => {
   const condition = await Product.findOne({ _id: req.params.id });
   const comment = await Comment.find({ product: { $in: [condition] } }).populate("product");
   return res.status(200).json({ comment, condition, count });
}

