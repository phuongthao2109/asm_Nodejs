import { Router } from 'express';
import { createSlider,listSlider,removeSlider} from "../controllers/sliderController"

const router = Router();
router.post('/sliders', createSlider)
router.get('/sliders', listSlider)
router.delete('/sliders/:id', removeSlider)
export default router;