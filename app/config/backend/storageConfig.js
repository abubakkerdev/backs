const path = require("path");
const storageConfig = () => {
  return {
    destination: (req, file, callback) => {
      callback(null, "./public/images/");
    },
    filename: (req, file, callback) => {
      // Important abc.jpg => abc-1688487638294-294720242.jpg
      const fileExt = path.extname(file.originalname);
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") + "-";
      callback(null, fileName + uniqueSuffix + fileExt);
    },
  };
};
module.exports = storageConfig;
