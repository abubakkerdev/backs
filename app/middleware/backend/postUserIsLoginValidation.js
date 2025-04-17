const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const routePermission = require("../../utils/routePermission");

const token = process.env.API_BACKEND_POST_TOKEN;
const ENCRYPTION_KEY = "Am#H9W_dEI2N+eKj";

function decryptDataObject(encryptedText) {
  const encodedCredentials = encryptedText.split(" ")[1];
  const decodedCredentials = Buffer.from(
    encodedCredentials,
    "base64"
  ).toString();
  const decodedToken = decodedCredentials.split("user:")[1];

  const key = CryptoJS.enc.Utf8.parse(ENCRYPTION_KEY);
  const iv = CryptoJS.enc.Utf8.parse(ENCRYPTION_KEY.substring(0, 16));
  const decrypted = CryptoJS.AES.decrypt(decodedToken, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
}

const postUserIsLoginValidation = (req, res, next) => {
  // const { postToken, loginToken } = JSON.parse(decodedCredentials);
  const auth = req.headers.authorization;
  let { postToken, loginToken } = decryptDataObject(auth);

  jwt.verify(loginToken, process.env.LOGIN_SECRET_KEY, function (err, decoded) {
    if (decoded) {
      if (token === postToken) {
        if (routePermission[decoded.role]?.apiPOST?.includes(req.originalUrl)) {
          next();
        } else {
          return res.send({
            error: { message: "Request URL not found on this Server." },
          });
        }
      } else {
        return res.send({
          error: { message: "Request URL not found on this Server." },
        });
      }
    } else {
      return res.send({
        error: "Request URL not found on this Server.",
      });
    }
  });
};

module.exports = postUserIsLoginValidation;
