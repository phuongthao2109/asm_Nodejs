import { Router } from 'express';
import {createOrder,findAllOrder} from "../controllers/OrderController"
const router = Router();
router.post('/orders', createOrder)
router.get('/orders', findAllOrder)
export default router;