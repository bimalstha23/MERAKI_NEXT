
import { Request } from 'express';
import multer from 'multer';


const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, `${__dirname}/../../public/products`);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = file.originalname.split('.').pop(); // Get the file extension
    cb(null, `${file.originalname}-${uniqueSuffix}.${fileExtension}`); // Filename with original extension
  },
})

export const upload = multer({ storage: storage }).array('images', 5) // Accept up to 5 files with the field name 'images'


