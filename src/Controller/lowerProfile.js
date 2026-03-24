import lawyerModel from '../models/LawyerProfile.js'
import Users from '../models/Users.js';


export const completeProfile = async (req, res)=>{
    
    const { email, barCouncilId, degree, lawyerType, experienceYears, totalCases, wonCases, lostCases, winRatio, feeMin, feeMax} = req.body;

    if(!email || !barCouncilId || !degree || !lawyerType){
        return res.status(400).json({success: false, message : 'All Field are required...'})
    }

    try {
        let existUser = await Users.findOne({email})

        if(!existUser){
            return res.status(404).json({success:false, message: " This email Id Not a Vailid..."})
        }

        if(existUser.role !== 'LAWYER'){
            return res.status(404).json({success:false, message:`Please Enter Vailid Email! You should be ${existUser.role}`})
        }

        let existingLawyer = await lawyerModel.findOne({userId:existUser._id})
        if(existingLawyer){
            return res.status(400).json({success:false, message : 'Lawyer is already Existing...'})
        }

        let lawyer = await lawyerModel.create({ 
            userId:existUser._id, barCouncilId, degree, lawyerType, experienceYears, totalCases, wonCases, lostCases, winRatio, feeMin, feeMax})

        return res.status(201).json({success:true,message: 'Create a Profile Successfully..', result: lawyer})

    } catch (error) {
        return res.status(500).json({success:false, message: `Server Error! ${error}`})
    }
}