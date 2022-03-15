import express from 'express';
import cors from 'cors';
import productRoute from './routes/products';
import morgan from 'morgan';
import mongoose from 'mongoose';
import methodOverride from 'method-override';
import { readdirSync } from 'fs';
import path, { dirname } from 'path';

const app = express();
// middleware
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())

// routes

readdirSync(__dirname + "/routes").forEach(async (fileName) => {
    import("./routes/" + fileName)
        .then(({ default: router }) => router.default)
        .then((router) => {
            app.use("/api", router);
        });
})

//connect db
mongoose.connect("mongodb://localhost:27017/asm_nodeJs")
    .then(() => console.log("Connecting to db"))
    .catch(err => console.log("Error connecting to db"))

//method
app.use(methodOverride('_method'));


// connect
const PORT = 3001;
app.listen(PORT, () => {
    console.log("Server của bạn đang chạy cổng ", PORT);
});