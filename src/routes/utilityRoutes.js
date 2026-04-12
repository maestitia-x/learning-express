import { Router } from 'express'
import {echoData, sumNumbers, ping, multiplyNumbers, subtractNumbers} from "../controllers/utilityController.js";

const router = Router();

router.post("/echo", echoData)
router.post('/sum', sumNumbers)
router.post('/multiply', multiplyNumbers)
router.post('/subtract', subtractNumbers)
router.get('/ping', ping)

export default router