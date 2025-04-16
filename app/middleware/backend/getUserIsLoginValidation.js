const jwt = require("jsonwebtoken");
const routePermission = require("../../utils/routePermission");
const token = process.env.API_BACKEND_GET_TOKEN;

const getUserIsLoginValidation = (req, res, next) => {
  const auth = req.headers.authorization;
  const encodedCredentials = auth.split(" ")[1];
  const decodedCredentials = Buffer.from(
    encodedCredentials,
    "base64"
  ).toString();
  const { getToken, loginToken } = JSON.parse(
    decodedCredentials.split("user:")[1]
  );

  // console.log(getToken, loginToken);
  // console.log("req.originalUrl", req.originalUrl);

  jwt.verify(loginToken, process.env.LOGIN_SECRET_KEY, function (err, decoded) {
    if (decoded) {
      if (token === getToken) {
        let basePath = req.originalUrl.replace(/\/[a-f0-9]{24}$/, "");

        if (routePermission[decoded.role]?.apiGET?.includes(basePath)) {
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

module.exports = getUserIsLoginValidation;
