const userModel = require("../../models/user");
const jwt = require("jsonwebtoken");
const crypto = require("node:crypto");
const sendEmail = require("../../utils/emailSend");
const bcrypt = require("bcrypt");
const emailConfirmTemplate = require("../../utils/confirmEmailTemplate");
const forgotEmailTemplate = require("../../utils/forgotEmailTemplate");
const saltRounds = 11;

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

// AES encryption function
function encryptDataObject(text) {
  const key = crypto.createHash("sha256").update(ENCRYPTION_KEY).digest();
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(text, "utf8", "base64");
  encrypted += cipher.final("base64");
  return iv.toString("base64") + ":" + encrypted;
}

const handleAuth = (req, res) => {
  res.send("All Auth Data Show.");
};

const handleStoreUser = async (req, res) => {
  const { uname, email, password } = req.body;

  const duplicateEmail = await userModel.find({ email });

  if (duplicateEmail.length == 0) {
    const hash = bcrypt.hashSync(password, saltRounds);
    const user = new userModel({
      uname,
      email,
      password: hash,
    });

    await user.save();

    let emailFrom = "Confirm Your Email.";
    let emailSubject = "Email Check";

    const token = jwt.sign(
      { id: user.email },
      process.env.EMAIL_CONFIRM_TOKEN,
      {
        algorithm: "HS384",
        expiresIn: "1d",
      }
    );

    sendEmail(email, emailConfirmTemplate, emailFrom, emailSubject, [token]);

    return res.send({
      success: {
        message: "Registration Successfull. Check Your Email.",
      },
    });
  } else {
    return res.send({
      error: {
        message: "Credential not match.",
      },
    });
  }
};

const handleEmailVerify = (req, res) => {
  const token = req.params.token;
 
  jwt.verify(
    token,
    process.env.EMAIL_CONFIRM_TOKEN,
    { algorithm: "HS384" },
    async (err, decoded) => {
      if (err) {
        return res.redirect(
          "http://localhost:5173/emailconfirm?error=nofound&id=1682208000-1687456800"
        );
      } else {
        const userInfo = await userModel.find({ email: decoded.id });

        if (userInfo.length !== 0 && userInfo[0].emailVerified) {
          return res.redirect(
            `http://localhost:5173/emailconfirm?success=done&id=${decoded.iat}-${decoded.exp}`
          );
        } else if (userInfo.length !== 0 && !userInfo[0].emailVerified) {
          await userModel.findOneAndUpdate(
            { email: decoded.id },
            { emailVerified: true },
            { new: true }
          );
          return res.redirect(
            `http://localhost:5173/emailconfirm?email=verify&id=${decoded.iat}-${decoded.exp}`
          );
        }
      }
    }
  );
};
 
const handleLoginUser = async (req, res) => {
  const { email, password } = req.body;

  if (email === "") {
    return res.send({
      error: {
        field: "email",
        message: "Email field is required.",
      },
    });
  } else if (password === "") {
    return res.send({
      error: {
        field: "password",
        message: "Password field is required.",
      },
    });
  } else {
    let existEmail = await userModel.find({ email });

    if (existEmail.length > 0) {
      bcrypt.compare(password, existEmail[0].password, function (err, result) {
        if (result) {
          if (existEmail[0].emailVerified) {
            const token = jwt.sign(
              { email: email, role: existEmail[0].role },
              process.env.LOGIN_SECRET_KEY,
              {
                algorithm: "HS384",
                expiresIn: "7d",
              }
            );

            let loginInfo = {
              uname: existEmail[0].uname,
              email: existEmail[0].email,
              role: existEmail[0].role,
              exp: Date.now() + 604800000,
              login: true,
              tokens: token,
            };

            // let loginInfo = {
            //   uname: existEmail[0].uname,
            //   email: existEmail[0].email,
            //   role: existEmail[0].role,
            //   exp: Date.now() + 30,
            //   login: true,
            //   tokens: token,
            // };

            const encrypted = encryptDataObject(JSON.stringify(loginInfo));

            return res.send({
              success: {
                message: "You’ve successfully logged in.",
                info: encrypted,
              },
            });
          } else {
            return res.send({
              error: {
                message: "Credential not match",
              },
            });
          }
        } else {
          return res.send({
            error: {
              message: "Credential not match",
            },
          });
        }
      });
    } else {
      return res.send({
        error: {
          message: "Credential not match",
        },
      });
    }
  }
};

const handleForgotPassword = async (req, res) => {
  const { email } = req.body;

  if (email === "") {
    return res.send({
      error: {
        field: "email",
        message: "Email field is required.",
      },
    });
  } else {
    let existEmail = await userModel.find({ email });

    if (existEmail.length > 0) {
      if (existEmail[0].emailVerified) {
        const token = jwt.sign(
          { email: email },
          process.env.FORGOT_PASSWORD_TOKEN,
          {
            algorithm: "HS384",
            expiresIn: "1h",
          }
        );

        const forgotTokenGenerate =
          Date.now() + "3" + Math.round(Math.random() * 1e9);

        let tokenInfo = {
          forgotToken: forgotTokenGenerate,
          tokens: token,
        };

        await userModel.findOneAndUpdate(
          { email },
          {
            forgotToken: forgotTokenGenerate,
          },
          { new: true }
        );

        let emailFrom = "Change Password URL";
        let emailSubject = "Verify Email Address";

        sendEmail(email, forgotEmailTemplate, emailFrom, emailSubject, [token]);

        return res.send({
          success: { message: "Check your Email.", info: tokenInfo },
        });
      } else {
        return res.send({
          error: {
            message: "Credential not match.",
          },
        });
      }
    } else {
      return res.send({
        error: {
          message: "Credential not match.",
        },
      });
    }
  }
};

const handleTokenVerify = (req, res) => {
  const token = req.params.token;

  jwt.verify(
    token,
    process.env.FORGOT_PASSWORD_TOKEN,
    { algorithm: "HS384" },
    async (err, decoded) => {
      if (err) {
        return res.redirect("http://localhost:5173/forgot-error");
      } else {
        const userInfo = await userModel.find({ email: decoded.email });
        if (userInfo.length !== 0 && userInfo[0].emailVerified) {
          return res.redirect(
            `http://localhost:5173/change-password/${userInfo[0].forgotToken}`
          );
        }
      }
    }
  );
};

const handleChangePassword = (req, res) => {
  const { password, forgotToken, tokens } = req.body;

  jwt.verify(
    tokens,
    process.env.FORGOT_PASSWORD_TOKEN,
    { algorithm: "HS384" },
    async (err, decoded) => {
      if (err) {
        return res.redirect("http://localhost:5173/login");
      } else {
        const userInfo = await userModel.find({ email: decoded.email });

        if (
          userInfo.length !== 0 &&
          userInfo[0].emailVerified &&
          userInfo[0].forgotToken == forgotToken
        ) {
          const hash = bcrypt.hashSync(password, saltRounds);

          await userModel.findOneAndUpdate(
            { email: decoded.email },
            {
              forgotToken: "",
              password: hash,
            },
            { new: true }
          );

          return res.send({
            success: { message: "Password Change Successful." },
          });
        }
      }
    }
  );
};

const handleEditUser = (req, res) => {
  res.send("Edit Single Category Data1.");
};

const handleUpdateUser = (req, res) => {
  res.send("Update Single Category Data1.");
};

const handleDestroyUser = (req, res) => {
  res.send("Delete Single Category Data1.");
};

module.exports = {
  handleAuth,
  handleStoreUser,
  handleEditUser,
  handleUpdateUser,
  handleDestroyUser,
  handleLoginUser,
  handleEmailVerify,
  handleForgotPassword,
  handleChangePassword,
  handleTokenVerify,
};
