import express from 'express';
import { AiGetInformation, createCaseAIthinking } from '../Controller/clientController.js';
import { autharized } from '../middleware/autharization.js';
import upload from '../middleware/uploadMiddleware.js';


const router = express.Router()


router.get('/AifetchData',autharized, AiGetInformation)


router.post('/createCase', autharized, upload.array("proofFiles", 2), createCaseAIthinking)




export default router