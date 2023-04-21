const express = require("express");
const dotenv = require("dotenv").config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Hello from the backend" });
});

app.listen(PORT, () => {
  console.log(`Listening on Port:${PORT}`);
});
