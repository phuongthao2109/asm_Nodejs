import Slider from "../models/Slider"
import mongoose from 'mongoose';


export const createSlider = async (req, res, next) => {
   try {
      const comment = await new Slider(req.body).save()
      return res.status(200).json(comment);
   } catch (err) {
      return res.json({ message: `BE:${error.message}` });
   }
}

export const listSlider = async (req, res, next) => {
   try {
      const slider = await Slider.find({}).exec();
      return res.status(200).json(slider);
   } catch (error) {
      return res.json({ message: `BE:${error.message}` });
   }
}

export const removeSlider = async (req, res, next) => {
   try {
       const slider = await Slider.deleteOne({ _id: req.params.id })
           .then((data) => res.json(data))
           .catch(next)
   } catch (error) {
       res.status(400).send(`Delete failed ${error.message}`);
   }
}