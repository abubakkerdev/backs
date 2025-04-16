const token = process.env.API_FRONTEND_GET_TOKEN;

const apiGetRequestValidation = (req, res, next) => {
  const auth = req.headers.authorization;
  const encodedCredentials = auth.split(" ")[1];
  const decodedCredentials = Buffer.from(
    encodedCredentials,
    "base64"
  ).toString();
  const [username, password] = decodedCredentials.split(":");

  if (token === password) {
    next();
  } else {
    res.send({
      error: "Request URL not found on this Server.",
    });
  }
};

module.exports = apiGetRequestValidation;
