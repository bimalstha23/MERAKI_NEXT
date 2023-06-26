
import { Request } from 'express';
import multer from 'multer';


const storage = multer.memoryStorage()

export const upload = multer({ storage: storage }).array('images', 5) // Accept up to 5 files with the field name 'images'


