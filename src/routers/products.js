import { Router } from 'express';
import { create, list, remove, update,getDetail} from '../controllers/productsController';
import { checkAuth } from '../middleware/checkAuth';

const router = Router();



router.get('/products', checkAuth, list);
router.post('/products', checkAuth, create);
router.get('/products/:slug', checkAuth,getDetail);
router.delete('/products/:id', checkAuth, remove);
router.patch('/products/:slug', checkAuth, update);

export default router;