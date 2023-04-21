const express = require("express");
const router = express.Router();
const Workout = require("../models/workoutModel");

router.get("/", (req, res) => {
  res.json({ message: "GET all workouts" });
});
router.get("/:id", (req, res) => {
  res.json({ message: "GET a single workout" });
});
router.post("/", async (req, res) => {
  const { title, reps, load } = req.body;
  // if (!title || !reps || !load) {
  //   return res.status(400).json({ error: "Missing required fields" });
  // }
  try {
    const workout = await Workout.create({
      title,
      reps,
      load,
    });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.patch("/:id", (req, res) => {
  res.json({ message: "UPDATE a workout" });
});
router.delete("/:id", (req, res) => {
  res.json({ message: "DELETE a workout" });
});

module.exports = router;
