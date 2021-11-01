const util = require("util");
const multer = require("multer");

const DIR = "./files/document";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 100, //限制檔案上傳為100Mb
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "text/plain" ||
      file.mimetype ==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.mimetype == "application/msword" ||
      file.mimetype == "application/pdf" ||
      file.mimetype == "application/vnd.oasis.opendocument.text"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(
        new Error("File types allowed .txt, .doc, .docx, .pdf and .odt!")
      );
    }
  },
}).single("file");

const fileUploadMiddleware = util.promisify(upload);

module.exports = fileUploadMiddleware;
