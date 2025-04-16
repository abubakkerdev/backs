const multer = require("multer");
const storageConfig = require("./storageConfig");
const storage = multer.diskStorage(storageConfig());
const imageFilter = {
  limits: {
    fileSize: 10000000,
  },
  fileFilter: (req, file, callback) => {
    callback(null, true);
  },
};
const upload = multer({
  storage: storage,
  ...imageFilter,
});

module.exports = upload;
