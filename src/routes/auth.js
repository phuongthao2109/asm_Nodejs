import { Router } from 'express';
import { isAdmin, isAuth, isExist } from "../middleware/Authenticate";
import { Resgister, List, Login, Add, removeUser, getDetail, update } from "../controllers/authController";
const router = Router();

router.post("/register", Resgister);
router.post("/login", Login);

router.get("/users", isAuth, isExist, isAdmin, List)
router.post('/users', isAuth, isExist, isAdmin, Add)
router.delete("/users/:id", isAuth, isExist, removeUser)
router.get('/users/:id', isAuth, isExist, getDetail)
router.patch('/users/:id', isAuth, isExist, isAdmin, update)

export default router;     