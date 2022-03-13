import express from 'express';
import cors from 'cors';
import productRoute from './routers/products';
import morgan from 'morgan';
import mongoose from 'mongoose';
const app = express();
// middleware
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())

// routes
app.use("/api", productRoute)

//connect db
mongoose.connect("mongodb://localhost:27017/asm_nodeJs")
.then(() => console.log("Connecting to db"))
.catch(err => console.log("Error connecting to db"))

// connect
const PORT = 3001;
app.listen(PORT, () => {
    console.log("Server của bạn đang chạy cổng ", PORT);
});