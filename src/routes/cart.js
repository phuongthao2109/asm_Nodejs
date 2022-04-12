import express from "express";
import { addToCart,findAllCartUser,updateCart } from "../controllers/CartController";

const router = express.Router();

router.post("/cart", addToCart);
router.get("/cart/:userId", findAllCartUser);
router.put("/cart/:actionId", updateCart);
export default router;