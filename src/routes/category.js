import { Router } from 'express';
import {create,list,getDetail,remove} from '../controllers/categoryController';

const router = Router();


router.post('/category/create',create);
router.get('/category', list);
router.get('/category/:slug', getDetail);
router.delete('/category/:id', remove)

export default router;