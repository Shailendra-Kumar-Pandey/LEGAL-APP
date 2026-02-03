import express from 'express';
import { AiGetInformation } from '../Controller/clientController.js';
import { autharized } from '../middleware/autharization.js';


const router = express.Router()


router.get('/AifetchData',autharized, AiGetInformation)




export default router