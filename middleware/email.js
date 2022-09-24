require("dotenv").config("../");
const mailjet = require("node-mailjet").connect(
  process.env.EMAIL_NAME,
  process.env.EMAIL_SECRET
);
const sendEmail = async (options) => {
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "bidoala73@gmail.com",
          Name: "e-shop",
        },
        To: [
          {
            email: options.email,
            Name: "for me ",
          },
        ],
        subject: options.subject,
        Text: options.status,
        CustomID: "AppGettingStartedTest",
      },
    ],
  });
  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.log(err.statusCode);
    });
};
module.exports = sendEmail;
