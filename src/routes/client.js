import express from 'express';
import { AiGetInformation, createCaseAIthinking } from '../Controller/clientController.js';
import { autharized } from '../middleware/autharization.js';


const router = express.Router()


router.get('/AifetchData',autharized, AiGetInformation)


router.post('/createCase', autharized, createCaseAIthinking)




export default router