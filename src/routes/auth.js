import { Router } from 'express';
import { isAdmin, isAuth, isExist } from "../middleware/Authenticate";
import { Resgister, List, Login, Add, removeUser, getDetail, update } from "../controllers/authController";
const router = Router();

router.post("/register", Resgister);
router.post("/login", Login);

router.get("/users", List)
router.post('/users', Add)
router.delete("/users/:id",removeUser)
router.get('/users/:id', getDetail)
router.patch('/users/:id', update)

export default router;     