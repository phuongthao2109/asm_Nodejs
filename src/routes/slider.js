import { Router } from 'express';
import { createSlider,listSlider} from "../controllers/sliderController"

const router = Router();
router.post('/sliders', createSlider)
router.get('/sliders', listSlider)

export default router;