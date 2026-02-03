import lawyerModel from '../models/LawyerProfile.js'


export const completeProfile = async (req, res)=>{
    
    const { userId, barCouncilId, degree, lawyerType, experienceYears, totalCases, wonCases, lostCases, winRatio, feeMin, feeMax} = req.body;

    if(!userId || !barCouncilId || !degree || !lawyerType){
        return res.status(400).json({massaga : 'All Field are required...'})
    }

    try {
        let existingLawyer = await lawyerModel.findOne({userId})
        if(existingLawyer){
            return res.status(400).json({massaga : 'Lawyer is already Existing...'})
        }

        let lawyer = await lawyerModel.create({ userId, barCouncilId, degree, lawyerType, experienceYears, totalCases, wonCases, lostCases, winRatio, feeMin, feeMax})

        return res.status(201).json({massage: 'Create a Profile Successfully..', result: lawyer})

    } catch (error) {
        return res.status(201).json({massage: 'create a Profile..'})
    }
}