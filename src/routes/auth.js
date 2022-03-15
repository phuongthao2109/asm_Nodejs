import { Router } from 'express';
import { Login, Register } from "../controllers/authController";
const router = Router();

router.post("/register", Register);
router.post("/signup", Register);

router.post("/signin", Login);
router.post("/login", Login);

export default router;