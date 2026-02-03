import user from "../models/Users.js";
import bcrypt from 'bcrypt';
import { token } from "../utlizer/ganerateToken.js";
import lawyerProfileModel from '../models/LawyerProfile.js'

export const Ragistration = async (req, res) => {
   
  let {name, email, Phone, password, role} = req.body

  // chacking all field required
  if (!name || !email || !Phone || !password || !role) {
    return res.status(400).json({ massage: "All fields are required..." });
  }
  
  // Email vailidation field necessary @ and .com 
  if (!email.includes('@' && '.com')) {
    return res.status(400).json({ massage: "Please Enter Vailid Email..." });
  }

  // Chack Database inside Email is unique
  if(await user.findOne({email:email})){
    return res.status(400).json({massage:"Email Already Exit..."})
  }
  
  try {
    // Create New user in Data Base
    let newUser = await user.create({
      name,
      email,
      Phone,
      password,
      role
    })
    // Send response client Side
    return res.status(201).json({
      massage : " New User Create Successfully...",
      result : {
        _id:newUser._id,
        name,
        email,
        Phone,
        role
      }
    })
  } catch (error) {
    return res.status(500).json({ massage: `${error} Somthing went wrong...` });
  }
};


export const Login = async (req, res)=>{

  let {email, password} = req.body;
  // Enter both feild required
  if(!email || !password){
    return res.status(404).json({massaga: "All fields are Required..."})
  }

  try {
    // Find Email is correct or Not
    let existingUser = await user.findOne({email});
    // console.log(existingUser)
    if(!existingUser){
      return res.status(404).json({massage : "Invailid Email..."})
    }
    
    // Chack Password Correct or Not
    let isMatch = await bcrypt.compare(password.toString(), existingUser.password)
  
    if(!isMatch){
      return res.status(404).json({massage : "Invailid Password..."})
    }

    // chack tha Lawyer Profile is Complte or Not

    if(existingUser.role === 'LAWYER'){

      let lawyer = await lawyerProfileModel.findOne({userId: existingUser._id})
  
      if(!lawyer){
        return res.status(404).json({massage: 'Please complte Profile..'})
      }
  
      if(lawyer?.status !== 'APPROVED'){
        return res.status(404).json({massage: `Status: ${lawyer.status}, Please contect tha Admin...`})
      }

    }


    // Send response and Generate Token
    return res.status(200).json({
      massage : "Login Successfully...",
      token: token(existingUser._id, existingUser.email),   // this Line - function generate Token
      result: {
        _id:existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        Phone: existingUser.Phone,
        role: existingUser.role
      }
    })    
  } catch (error) {
    return res.status(500).json({massage : `${error} Somthing went wrong...`})    
  }
}
