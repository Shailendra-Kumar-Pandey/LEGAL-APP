import express from 'express';
import { Ragistration, Login } from "../Controller/userRegistration.js";
const router = express.Router();



router.post('/createUser', Ragistration)

router.post('/userLogin', Login)



export default router;