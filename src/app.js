import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import SwaggerUi from "swagger-ui-express"
import YAML from "yaml"
import { readdirSync } from 'fs';
import userRoute from "./routes/auth"
import productRoute from "./routes/products"
import cateRoute from "./routes/category"
import cartRoute from "./routes/cart"
import commentRoute from "./routes/comment"
import sliderRoute from "./routes/slider";

const app = express();
// middleware
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
};
require('dotenv').config()
app.use(cors(corsOptions));
app.use(morgan('tiny'))
app.use(express.json({ limit: "50mb" }))

// routes

// readdirSync(__dirname + "/routes").forEach(async (fileName) => {
//     import("./routes/" + fileName)
//         .then(({ default: router }) => router.default)
//         .then((router) => {
//             app.use("/", router);
//         });
// })
app.use("/", userRoute);
app.use("/", productRoute)
app.use("/", cateRoute)
app.use("/", cartRoute)
app.use("/", commentRoute)
app.use("/", sliderRoute)

//connect db
mongoose.connect("mongodb://localhost:27017/asm_nodeJs")
    .then(() => console.log("Connecting to db"))
    .catch(err => console.log("Error connecting to db"))


// connect
const PORT = process.env.PORT || 1801;
app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT);
});