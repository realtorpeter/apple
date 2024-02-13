const express = require("express");
const path = require("path");
const antibot = require("./middleware/antibot");
const device = require("express-device");
const app = express();
const port = process.env.PORT || 3000;

// ANTI-BOT
app.use(antibot);

// Middleware to detect device type
app.use(device.capture());

// Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// SET VIEW EJS ENGINE
app.set("view engine", "ejs");

// Routes
const router = require("./routers/router");
app.use("/", router);

// Middleware to set the template based on the device type
app.use((req, res, next) => {
  if (req.device.type === "desktop") {
    res.locals.template = "desktop";
  } else {
    res.locals.template = "mobile";
  }
  next();
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
