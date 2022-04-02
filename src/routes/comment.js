import { Router } from 'express';
import { createComment, listCmt, countCmt,getDetail, updateCmt, sorfDelete, forceRemove, restoreCmt, countCmtByProductId} from "../controllers/commentController"

const router = Router();
router.post('/comments', createComment)
router.get('/comments', listCmt)
router.get('/comments/count',countCmt)
//  router.get('/comments/:id', getDetail)
// router.patch('/comments/:id', updateCmt)
// router.delete('/comments/:id/sorfDelete', sorfDelete)
// router.delete('/comments/:id', forceRemove)
// router.patch('/comments/:id/restore', restoreCmt)
// router.get('/comments/:id/findByProId', countCmtByProductId)

export default router;