const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(
  {origin: "https://localhost:3000"}
));
app.use(cookieParser());

app.use(require("./routes"));

app.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});
