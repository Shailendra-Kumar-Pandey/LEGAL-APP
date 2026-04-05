import { GoogleGenAI } from '@google/genai'
import ClientCaseModel from '../models/ClientCase.js';
import AianalysisModel from '../models/Aianalysis.js';

export const AiGetInformation = async(req, res)=>{


    let {prompt} = req.body;
    // console.log(prompt)
    
    try {
    
        // AI function import
        const ai = new GoogleGenAI({
            apiKey : process.env.GEMINAI_API_KEY
        })
        // AI function import
        const response = await ai.models.generateContent({
            model: process.env.GEMINAI_MODEL,
            contents: prompt,
            config:{
                systemInstruction : "Please return data in json format"
            }
        });
        // response extract 
        // const extract = response?.candidates[0]?.content?.parts[0]?.text;

        return res.status(200).json({
            success:true, message: " Think... AI...",
            result : response
        })
        
    } catch (error) {
        
        return res.status(500).json({success:false, message: `${error} Server Error...`})
    }    

    
    
}



export const createCaseAIthinking = async(req, res)=>{

    let userId = req.userID;
    // console.log(userId)
    const {problemStatement, location, caseDate } = req.body;
    
    if(!problemStatement || !location || !caseDate){
        return res.status(404).json({success:false, message: "All Feild Required..."})
    }
    // console.log("hello")

    let proofFiles = []

    if(req.file && req.file.length > 0){
        proofFiles.map((ele)=>{
            return {
                fileName : ele.fileName,
                fileURL : ele.fle
            }
        })
    }

    try {
        
        let clientCase = await ClientCaseModel.create({
            userId,
            problemStatement,
            location,
            caseDate
        })

        let prompt = `

                You are a legal analysis engine.

                TASK:
                Analyze the legal case described below and return STRICT JSON ONLY.

                CASE DESCRIPTION: "${problemStatement}"

                RULES:
                - Return valid JSON only.
                - Do not include markdown, comments, or explanations.
                - Do not add extra fields.
                - If information is missing, make a reasonable legal assumption.
                - All monetary values must be numbers only.
                - suggestedIPSSections must be an array of strings and IPS detailes.

                RETURN FORMAT:
                {
                "predictedCaseType": "",
                "caseSeverity": "HIGH" | "MEDIUM" | "LOW",
                "suggestedIPCSections": [],
                "worstCaseOutcome": "",
                "estimatedFeeMin": 0,
                "estimatedFeeMax": 0,
                "remark": "",
                "typeOfLawyerNeeded": "Criminal" | "Civil" | "Family" | "Corporate" | "Cyber" | "Property"
                }
                
        `

        //AI Part in API giving prompt and thinking this DATA
        const ai = new GoogleGenAI({
            apiKey : process.env.GEMINAI_API_KEY
        })
        // AI function import
        const response = await ai.models.generateContent({
            model: process.env.GEMINAI_MODEL,
            contents: prompt,
            config:{
                systemInstruction : "Please return data in json format"
            }
        });

        let extractResponse = response.candidates[0].content.parts[0].text;
        let realResponse = JSON.parse(extractResponse)


        let AIresponse = await AianalysisModel.create({
            clientCaseId: clientCase?._id,
            predictedCaseType: realResponse?.predictedCaseType,
            caseSeverity: realResponse?.caseSeverity,
            suggestedIPCSections: realResponse.suggestedIPCSections,
            worstCaseOutcome: realResponse?.worstCaseOutcome,
            estimatedFeeMin: realResponse?.estimatedFeeMin,
            estimatedFeeMax: realResponse?.estimatedFeeMax,
            remark : realResponse?.remark 
        })

        return res.status(200).json({
            success:true,
            result: realResponse,
            clientCase,
            AIresponse
        })

    } catch (error) {
        return res.status(500).json({
            error:error,
            success:false,
             message: `${error} server error`
        })
    }

}