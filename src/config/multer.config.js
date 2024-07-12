import multer from "multer"
import __direname from "../utils.js"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file.fieldname === 'profile'){
            cb(null, __direname + "/public/img/profiles")
        }
        if(file.fieldname === 'product'){
            cb(null, __direname + "/public/img/products")
        }
        if(file.fieldname === 'document'){
            cb(null, __direname + "/public/img/documents")
        }
        else{
            cb(null, __direname + "/public/img/others")
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage: storage})

export default upload