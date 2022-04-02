import { Router } from 'express';
import { create, list, getDetail, remove, listCateActive, getDetailById ,update} from '../controllers/categoryController';

const router = Router();

router.post('/categories', create);
router.get('/categories', list);
router.get('/categories/active', listCateActive);
router.get('/categories/:slug', getDetail);
router.get('/categories/:id/edit', getDetailById);
router.delete('/categories/:id', remove)
router.patch('/categories/:id',update)

export default router;