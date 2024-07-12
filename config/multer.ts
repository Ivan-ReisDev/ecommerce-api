import multer, { Options } from "multer"
import path from "path"

export default {
    storage: multer.diskStorage({
        destination: path.join(__dirname, "..", "src", "uploads"),
        filename(req, file, callback) {
            callback(null, `${Date.now()}-${file.originalname}`)
        },

    }),

    limits: {
        fileSize: 10 * 1024 * 1024 //10mb

    },

    fileFilter: (req, file, cb) => {
        const mimeType = ["image/png", "image/jpg", "image/jpeg"]
        if(!mimeType.includes(file.mimetype)){
            return cb(null, false);
        }

        cb(null, true);

    } 


} as Options