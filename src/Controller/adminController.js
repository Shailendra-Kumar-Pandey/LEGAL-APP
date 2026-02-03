import lawyerModel from '../models/LawyerProfile.js'
import userModel from '../models/Users.js'
import mailSender from '../utlizer/mailSender.js'

export const fetchAllLawyer = async(req, res)=>{

    try {

        const allLawyer = await lawyerModel.find()

        res.status(200).json({
            massage: "GET All Lawyers...",
            result: allLawyer
        })
        
    } catch (error) {
    
        return res.status(500).json({massage: "Server Error..."})
    }
    
}

export const lawyerStatusChange = async (req, res)=>{

    try {
        
        let {status, adminRemark} = req.body;
    
        let lawyerId = req.params.lawyerId;
        // chack send the lawyer Id Or Not 
        if(!lawyerId){
            return res.status(404).json({massage: "Please Enter Lawyer ID.."})
        }

        let lawyer = await lawyerModel.findOne({userId:lawyerId})
        // Chack lawer data avilable or Not
        if(!lawyer){
            return res.status(404).json({massage: "Please Enter Vailid Lawyer ID.."})
        }

        let user = await userModel.findOne(lawyer.userId)

        
        // update lawyer Status , Admin Remark and Date also
        lawyer.status = status;
        lawyer.adminRemark = adminRemark;
        status === "APPROVED"? lawyer.approvedAt = new Date() : null
        // save the dataBase
        await lawyer.save();

        // email send for status change then receve Email-Lawyer 
        let to = user.email;
        let subject = status;
        let text = adminRemark;
        let html = ``;
        
        await mailSender(to, subject, text, html)

        return res.status(201).json({massage: "Update Lawyer Profile...", result: lawyer})

    } catch (error) {
        return res.status(500).json({massage: `${error} Server Error...`,})
    }

}