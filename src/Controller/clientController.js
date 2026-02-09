import { GoogleGenAI } from '@google/genai'
import ClientCaseModel from '../models/ClientCase.js';

export const AiGetInformation = async(req, res)=>{


    let {prompt} = req.body;
    // console.log(prompt)
    
    try {
    
        // AI function import
        const ai = new GoogleGenAI({
            apiKey : "AIzaSyDzUqfXM7RsZ4hniABXuFirMd3GF5eqQbY"
        })
        // AI function import
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config:{
                systemInstruction : "Please return data in json format"
            }
        });
        // response extract 
        // const extract = response?.candidates[0]?.content?.parts[0]?.text;

        return res.status(200).json({
            massage: " Think... AI...",
            result : response
        })
        
    } catch (error) {
        
        return res.status(500).json({massage: `${error} Server Error...`})
    }    

    
    
}



export const createCaseAIthinking = async(req, res)=>{

    let userId = req.userID;
    // console.log(userId)
    const {problemStatement, location, caseDate } = req.body;
    
    if(!problemStatement || !location || !caseDate){
        return res.status(404).json({massage: "All Feild Required..."})
    }
    // console.log("hello")
    try {
        
        let clientCase = ClientCaseModel.create({
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
                - suggestedIPSSections must be an array of strings.

                RETURN FORMAT:
                {
                "predictedCaseType": "",
                "caseSeverity": "HIGH" | "MEDIUM" | "LOW",
                "suggestedIPSSections": [],
                "worstCaseOutcome": "",
                "estimatedFeeMin": 0,
                "estimatedFeeMax": 0,
                "remark": "",
                "typeOfLawyerNeeded": "Criminal" | "Civil" | "Family" | "Corporate" | "Cyber" | "Property"
                }
        
        `

        //AI Part in API giving prompt and thinking this DATA
        const ai = new GoogleGenAI({
            apiKey : "AIzaSyDaIc0lq4S1ZAtNCW2B9LwloeU5I5BvSA4"
        })
        // AI function import
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config:{
                systemInstruction : "Please return data in json format"
            }
        });

        let extractResponse = response.candidates[0].content.parts[0].text;
        let realResponse = JSON.parse(extractResponse)

        return res.status(200).json({
            result: realResponse,
            clientCase:clientCase
        })

    } catch (error) {
        return res.status(500).json({
            error:error,
            massage: "server error"
        })
    }

}