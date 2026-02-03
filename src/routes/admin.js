import express from 'express';
import { fetchAllLawyer, lawyerStatusChange } from '../Controller/adminController.js';
import { autharized } from '../middleware/autharization.js';


const router = express.Router();

router.get('/getAllLawyers',autharized, fetchAllLawyer)

router.put('/lawyerStatusUpdate/:lawyerId',autharized, lawyerStatusChange)


export default router;