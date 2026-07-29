import multer from "multer";
import path from "path";
import crypto from "crypto";

const storage = multer.diskStorage({
    destination(req, file, cb) {
    cb(null, "uploads/");
    },

    filename(req, file, cb) {
    const hash = crypto.randomBytes(10).toString("hex");

    const extension = path.extname(file.originalname);

    cb(null, `${hash}${extension}`);
    },
});

export const upload = multer({
    storage,
});