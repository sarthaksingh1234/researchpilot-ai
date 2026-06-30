const Project = require("../models/Project");
const asyncHandler = require("../middleware/asyncHandler");

const createProject = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    res.status(400);
    throw new Error("Project title is required");
  }

  const project = await Project.create({
    title,
    description,
    owner: req.user._id,
  });

  res.status(201).json(project);
});

const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({
    owner: req.user._id,
  }).sort({
    createdAt: -1,
  });

  res.json(projects);
});

const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findOne({
    _id: req.params.id,
    owner: req.user._id,
  });

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  res.json(project);
});

const updateProject = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  const project = await Project.findOneAndUpdate(
    {
      _id: req.params.id,
      owner: req.user._id,
    },
    {
      title,
      description,
    },
    {
      new: true,
    }
  );

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  res.json(project);
});

const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findOneAndDelete({
    _id: req.params.id,
    owner: req.user._id,
  });

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  res.json({
    message: "Project deleted successfully",
  });
});

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};