import express from 'express';
import { completeProfile } from '../Controller/lowerProfile.js';
const router = express.Router()


router.post('/completeProfile', completeProfile)




export default router