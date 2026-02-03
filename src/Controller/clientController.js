

export const AiGetInformation = async(req, res)=>{

    let {prompt} = req.body;
    console.log(prompt)
    
    try {
        
        
    } catch (error) {
        
        return res.status(500).json({massage: `${error} Server Error...`})
    }    

    
    
}