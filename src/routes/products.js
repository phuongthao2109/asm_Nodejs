import { Router } from 'express';
import { createPro, list, remove, update, getDetail, getDetailBySlug } from '../controllers/productsController';
import { isAdmin, isAuth, isExist } from "../middleware/Authenticate";

const router = Router();

router.delete('/products/:id', remove);
router.patch('/products/:id', update);
router.post('/products',  createPro);
router.get('/products', list);
router.get('/products/:slug', getDetailBySlug);
router.get('/products/:id/edit', getDetail);
export default router;