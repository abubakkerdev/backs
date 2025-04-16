function confirmEmail(info) {
  let TemplateDesign = `
    <h2>Confirm Email Address</h2> 
    <h4><a href="http://localhost:1010/api/v1/backend/authentication/confirm-email/${info[0]}">Confirm Email</a></h4>
    `;
  return TemplateDesign;
}

module.exports = confirmEmail;
