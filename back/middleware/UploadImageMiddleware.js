const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Upload single image
exports.uploadCategoryImage = upload.single('imageCover');

// Upload single image
exports.uploadProfileImage = upload.single('profileimage');




















// const { v4: uuidv4 } = require("uuid");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${uuidv4()}_${path.extname(file.originalname)}`);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
//   if (allowedFileTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const uploadMiddleware = multer({ storage, fileFilter });

// module.exports = uploadMiddleware;
