import User from "../models/UsersModel";
import {verifyToken} from "../utils/accesstoken"

export const isAuth = (req, res, next) => {
   const headerToken = req.headers["authorization"];
   const accesstoken = headerToken && headerToken.split(" ")[1];
   if (headerToken === undefined) {
     return res.status(403).json({
       error: "Access denied, authorizastion required",
     })
   }
   verifyToken(accesstoken, (user, error) => {
     if (error) {
       return res.status(401).json({
         error: "Access denied, your token has been expired"
       });
     }
     req.auth = user;
     next();
   })
 };
 export const isExist = async (req, res, next) => {
   const user = await User.findOne({ _id: req.auth.id }).exec();
   if (!user) {
     return res.status(401).json({
       error: "Access denied, user anot found",
     });
   }
   req.auth = user;
   next();
 }
 export const isAdmin = async (req, res, next) => {
   if (req.auth.role === "user") {
     return res.status(401).json({
       error: "Access denied, administration required",
     });
   }
   next();
 };
