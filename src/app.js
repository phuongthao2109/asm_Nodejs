import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import methodOverride from 'method-override';
import SwaggerUi from "swagger-ui-express"
import YAML from "yaml"
import { readdirSync } from 'fs';

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
            app.use("/", router);
        });
})
 
//connect db
mongoose.connect("mongodb://localhost:27017/asm_nodeJs")
    .then(() => console.log("Connecting to db"))
    .catch(err => console.log("Error connecting to db"))


// connect
const PORT = 18000;
app.listen(PORT, () => {
    console.log("Server của bạn đang chạy cổng ", PORT);
});