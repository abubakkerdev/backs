const passwordValidation = (req, res, next) => {
  const { password, cpassword } = req.body;

  let number = /\d/g;
  let numberValid = number.test(password);
  let alphabet = /[a-z]/g;
  let alphabetValid = alphabet.test(password);
  let alphabetCap = /[A-Z]/g;
  let alphabetCapValid = alphabetCap.test(password);
  let specialChar = /[\W]/g;
  let specialCharValid = specialChar.test(password);

  if (password === "") {
    return res.send({
      error: {
        field: "password",
        message: "Password field is required.",
      },
    });
  } else if (!numberValid) {
    return res.send({
      error: {
        field: "password",
        message: "You have must type 1 Digit.",
      },
    });
  } else if (!alphabetValid) {
    return res.send({
      error: {
        field: "password",
        message: "You have must type 1 Lower-case.",
      },
    });
  } else if (!alphabetCapValid) {
    return res.send({
      error: {
        field: "password",
        message: "You have must type 1 Upper-case.",
      },
    });
  } else if (!specialCharValid) {
    return res.send({
      error: {
        field: "password",
        message: "You have must type 1 Special-Chars.",
      },
    });
  } else if (password.length < 8) {
    return res.send({
      error: {
        field: "password",
        message: "You have type Minimum 8 Characters.",
      },
    });
  } else if (cpassword === "") {
    return res.send({
      error: {
        field: "cpassword",
        message: "Confirm Password field is required.",
      },
    });
  } else if (password != cpassword) {
    return res.send({
      error: {
        field: "cpassword",
        message: "Password and Confirm Password does not match.",
      },
    });
  } else {
    next();
  }
};

module.exports = passwordValidation;
