function passwordTemplate(info) {
  let passwordSet = `
    <h2>Your account info: </h2> 
    <h4>Email : ${info[0]} </h4>
    <h4>Password : ${info[1]}</h4>`;
  return passwordSet;
}

module.exports = passwordTemplate;
