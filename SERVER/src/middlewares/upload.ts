
import multer from 'multer';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../products/') // Directory where uploaded files will be stored
    },

    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null, file.fieldname + '-' + uniqueSuffix) // Filename for the uploaded file
    }
})

export const upload = multer({ storage: storage }).array('images', 5) // Accept up to 5 files with the field name 'images'


