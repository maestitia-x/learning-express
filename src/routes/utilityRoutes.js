import { Router } from 'express'
import {echoData, sumNumbers, ping, multiplyNumbers, subtractNumbers} from "../controllers/utilityController.js";
import {validateNumbers} from "../middlewares/validateNumbers.js";
import {logBody} from "../middlewares/logBody.js";

const router = Router();

router.post("/echo", echoData)
router.post('/sum',logBody, validateNumbers, sumNumbers)
router.post('/multiply',logBody,  validateNumbers,multiplyNumbers)
router.post('/subtract', logBody, validateNumbers,subtractNumbers)
router.get('/ping', ping)

export default router