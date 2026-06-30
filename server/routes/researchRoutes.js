const express = require("express");
const {
  createResearch,
  getResearchByProject,
  deleteResearch,
  uploadResearchPDF,
  askResearchDocument,
} = require("../controllers/researchController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const { body, param } = require("express-validator");
const validate = require("../middleware/validationMiddleware");
const { aiLimiter } = require("../middleware/rateLimitMiddleware");

const router = express.Router();


router.post(
  "/",
  protect,
  aiLimiter,
  [
    body("projectId").isMongoId().withMessage("Invalid project ID"),
    body("prompt").notEmpty().withMessage("Prompt is required"),
  ],
  validate,
  createResearch
);

router.post(
  "/upload",
  protect,
  aiLimiter,
  upload.single("pdf"),
  [body("projectId").isMongoId().withMessage("Invalid project ID")],
  validate,
  uploadResearchPDF
);

router.post(
  "/:id/ask",
  protect,
  aiLimiter,
  [
    param("id").isMongoId().withMessage("Invalid research ID"),
    body("question").notEmpty().withMessage("Question is required"),
  ],
  validate,
  askResearchDocument
);

router.get(
  "/:projectId",
  protect,
  [param("projectId").isMongoId().withMessage("Invalid project ID")],
  validate,
  getResearchByProject
);

router.delete(
  "/:id",
  protect,
  [param("id").isMongoId().withMessage("Invalid research ID")],
  validate,
  deleteResearch
);

module.exports = router;