const express = require("express");
const bodyParser = require("body-parser");
const sendSms = require("./twilio");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const port = 3002;

const userDatabase = [];

// Create users endpoint
app.post("/users", async (req, res) => {
  const { email, password, phone } = req.body;
  const user = {
    email,
    password,
    phone,
  };

  userDatabase.push(user);

  let code = Math.floor(100000 + Math.random() * 900000).toString();

  const welcomeMessage = `Welcome to my App! Your verification code is ${code}`;

  //let details = await sendSms(user.phone, welcomeMessage);
  let message = await sendSms(user.phone, welcomeMessage);

  res.status(201).send({
    message:
      "Account created successfully, kindly check your phone to activate your account!",
    data: user,
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
