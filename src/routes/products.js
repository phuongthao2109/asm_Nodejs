import { Router } from 'express';
import { createPro, list, remove, update, getDetail, getDetailBySlug } from '../controllers/productsController';
// import { checkAuth, isAuth, isAdmin } from "../utils/checkAuth";

const router = Router();

router.delete('/products/:id', remove);
router.patch('/products/:id', update);
router.post('/products/:userId', createPro);
router.get('/products', list);
router.get('/products/:slug', getDetailBySlug);
router.get('/products/:id/edit', getDetail);
export default router;