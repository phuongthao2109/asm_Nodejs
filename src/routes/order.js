import { Router } from 'express';
import {findAllOrder} from "../controllers/OrderController"
const router = Router();
// router.post('/cart', createOrder)
// router.get('/cart/:id', userFindOrderList)

router.get('/orders', findAllOrder)
export default router;