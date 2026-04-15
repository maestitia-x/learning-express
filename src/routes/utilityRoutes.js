import { Router } from 'express'
import {echoData, sumNumbers, ping, multiplyNumbers, subtractNumbers} from "../controllers/utilityController.js";
import {validateNumbers} from "../middlewares/validateNumbers.js";

const router = Router();

router.post("/echo", echoData)
router.post('/sum', validateNumbers, sumNumbers)
router.post('/multiply', validateNumbers,multiplyNumbers)
router.post('/subtract', validateNumbers,subtractNumbers)
router.get('/ping', ping)

export default router