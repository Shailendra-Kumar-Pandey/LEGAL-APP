import multer from "multer";


const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, '/uploads')
    },
    filename:function(req, file, cb){
        const uniqueFileName = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueFileName)
    }
})


const upload = multer({
    storage,
    limits:{
        fileSize: 1 * 1024 * 1024   //  1 MB
    }
})


export default upload;
