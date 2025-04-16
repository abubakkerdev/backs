const registerValidation = (req, res, next) => {
  const { uname, email, password, cpassword } = req.body;
 
  const emailValid = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  ).test(email);
   
  let number = /\d/g;
  let numberValid = number.test(password);
  let alphabet = /[a-z]/g;
  let alphabetValid = alphabet.test(password);
  let alphabetCap = /[A-Z]/g;
  let alphabetCapValid = alphabetCap.test(password);
  let specialChar = /[\W]/g;
  let specialCharValid = specialChar.test(password);
 
  if (uname === "") {
    return res.send({
      error: {
        field: "uname",
        message: "Name field is required.",
      },
    });
  } else if (email === "") {
    return res.send({
      error: {
        field: "email",
        message: "Email field is required.",
      },
    });
  } else if (!emailValid) {
    return res.send({
      error: {
        field: "email",
        message: "Your email address is Invalid.",
      },
    });
  } else if (password === "") {
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

module.exports = registerValidation;
