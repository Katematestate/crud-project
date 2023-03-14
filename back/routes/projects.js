const { response } = require("express");
const express = require("express");
const router = express.Router();
// below is where you edit variable names based on your variable/file structure names
const Project = require("../models/project");
// GET (all) Projects route
router.get("/", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});
// POST new Project
router.post("/add", async (req, res) => {
  const newEntry = new Project(
    req.body // what vue app sending
  );
//   this next step is called error handling where you can catch errors and give an appropriate response.
  try {
    const savedEntry = await newEntry.save();
    res.json(savedEntry);
  } catch (error) {
    res.status(500).send({ error: "have you turned it off and on" });
  }
});
// GET (single) Project by ID
router.get("/get/:id", async (req, res) => {
  const IDed_Entry = await Project.findById({ _id: req.params.id });
  res.json(IDed_Entry);
});
// DELETE a Project by ID
router.delete("/delete/:id", async (req, res) => {
  const toDelete_Entry = await Project.findByIdAndDelete({
    _id: req.params.id,
  });
  res.json(toDelete_Entry);
});
// UPDATE a Project by ID
router.put("/update/:id", async (req, res) => {
  const toUpdate_Entry = await Project.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.json(toUpdate_Entry);
});
module.exports = router;
