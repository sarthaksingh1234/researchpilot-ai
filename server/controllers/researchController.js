const Research = require("../models/Research");
const Project = require("../models/Project");
const asyncHandler = require("../middleware/asyncHandler");

const {
  generateResearch,
  answerFromDocument,
} = require("../services/geminiService");

const { extractTextFromPDF } = require("../services/pdfService");

const createResearch = asyncHandler(async (req, res) => {
  const { projectId, prompt } = req.body;

  if (!projectId || !prompt) {
    res.status(400);
    throw new Error("Project ID and prompt are required");
  }

  const project = await Project.findOne({
    _id: projectId,
    owner: req.user._id,
  });

  if (!project) {
    res.status(404);
    throw new Error("Project not found or unauthorized");
  }

  const aiResult = await generateResearch(prompt);

  const research = await Research.create({
    project: projectId,
    user: req.user._id,
    prompt,
    summary: aiResult.summary,
    keyPoints: aiResult.keyPoints,
    tags: aiResult.tags,
  });

  res.status(201).json(research);
});

const getResearchByProject = asyncHandler(async (req, res) => {
  const project = await Project.findOne({
    _id: req.params.projectId,
    owner: req.user._id,
  });

  if (!project) {
    res.status(404);
    throw new Error("Project not found or unauthorized");
  }

  const research = await Research.find({
    project: req.params.projectId,
    user: req.user._id,
  }).sort({ createdAt: -1 });

  res.json(research);
});

const uploadResearchPDF = asyncHandler(async (req, res) => {
  const { projectId } = req.body;

  if (!projectId) {
    res.status(400);
    throw new Error("Project ID is required");
  }

  if (!req.file) {
    res.status(400);
    throw new Error("PDF file is required");
  }

  const project = await Project.findOne({
    _id: projectId,
    owner: req.user._id,
  });

  if (!project) {
    res.status(404);
    throw new Error("Project not found or unauthorized");
  }

  const extractedText = await extractTextFromPDF(req.file.path);

  const aiResult = await generateResearch(
    `Summarize this research paper:\n\n${extractedText.slice(0, 12000)}`
  );

  const research = await Research.create({
    project: projectId,
    user: req.user._id,
    prompt: `PDF Upload: ${req.file.originalname}`,
    summary: aiResult.summary,
    documentText: extractedText,
    keyPoints: aiResult.keyPoints,
    tags: aiResult.tags,
  });

  res.status(201).json(research);
});

const askResearchDocument = asyncHandler(async (req, res) => {
  const { question } = req.body;

  if (!question) {
    res.status(400);
    throw new Error("Question is required");
  }

  const research = await Research.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!research) {
    res.status(404);
    throw new Error("Research not found");
  }

  if (!research.documentText) {
    res.status(400);
    throw new Error("This research item does not have an uploaded document");
  }

  const answer = await answerFromDocument(research.documentText, question);

  research.documentChats.push({
    question,
    answer,
  });

  await research.save();

  res.json({
    question,
    answer,
    documentChats: research.documentChats,
  });
});

const deleteResearch = asyncHandler(async (req, res) => {
  const research = await Research.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!research) {
    res.status(404);
    throw new Error("Research not found");
  }

  res.json({
    message: "Research deleted successfully",
  });
});

module.exports = {
  createResearch,
  getResearchByProject,
  deleteResearch,
  uploadResearchPDF,
  askResearchDocument,
};