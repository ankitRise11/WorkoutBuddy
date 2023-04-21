const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");

const PORT = process.env.PORT || 4000;

const app = express();

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(express.json());
app.use("/api/workouts", workoutRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on Port:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
