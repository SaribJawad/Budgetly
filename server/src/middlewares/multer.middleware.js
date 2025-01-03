import multer from "multer";

const dir = "./public/temp";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, dir);
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

const storage = multer.memoryStorage();

export const upload = multer({ storage });
