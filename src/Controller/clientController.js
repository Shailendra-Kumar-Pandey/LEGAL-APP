import { GoogleGenAI } from '@google/genai'

export const AiGetInformation = async(req, res)=>{


    let {prompt} = req.body;
    console.log(prompt)
    
    try {
    
        // AI function import
        const ai = new GoogleGenAI({
            apiKey : "AIzaSyD9sdH_1NiT_ImnzfMOT45qiOsrXzRmzEo"
        })
        // AI function import
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config:{
                systemInstruction : "Please return data in json format"
            }
        });

        return res.status(200).json({
            massage: " Think... AI...",
            result : response.json()
        })
        
    } catch (error) {
        
        return res.status(500).json({massage: `${error} Server Error...`})
    }    

    
    
}