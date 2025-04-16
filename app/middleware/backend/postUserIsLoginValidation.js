const jwt = require("jsonwebtoken");
const routePermission = require("../../utils/routePermission");
const token = process.env.API_BACKEND_POST_TOKEN;

const postUserIsLoginValidation = (req, res, next) => {
  const auth = req.headers.authorization;
  const encodedCredentials = auth.split(" ")[1];
  const decodedCredentials = Buffer.from(
    encodedCredentials,
    "base64"
  ).toString();
  const { postToken, loginToken } = JSON.parse(
    decodedCredentials.split("user:")[1]
  );

  // console.log("req.originalUrl", req.originalUrl);
  
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
