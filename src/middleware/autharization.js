import Users from "../models/Users.js"
import jwt from 'jsonwebtoken';


export const autharized = async(req, res, next)=>{
     
    if(!req.headers.authorization){
        return res.status(401).json({massaga:"Please Enter Token..."})
    }
     
    try {
        
        if(req?.headers?.authorization && req?.headers?.authorization.startsWith('Bearer')){
   
           let token;
   
           token = req?.headers?.authorization.split(' ')[1]
   
           let verify = jwt.verify(token, 'ahgsdjgaecahisdhco');

           let user = await Users.findById(verify._id)

           if(!user){
            res.status(401).json({massage : "Not Authorized User..."})
           }
      
           next()
       }else{
            return res.status(401).json({massage:"Please Enter Vaild Token..."})
       }
    } catch (error) {
        res.status(401).json({massage: `${error} Not Authorized User...`})
    }
}