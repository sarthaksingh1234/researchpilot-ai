const express = require("express");
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const { protect } = require("../middleware/authMiddleware");
const { body, param } = require("express-validator");
const validate = require("../middleware/validationMiddleware");

const router = express.Router();

router.post(
  "/",
  protect,
  [
    body("title").notEmpty().withMessage("Project title is required"),
    body("description").optional().isString(),
  ],
  validate,
  createProject
);

router.get("/", protect, getProjects);

router.get(
  "/:id",
  protect,
  [param("id").isMongoId().withMessage("Invalid project ID")],
  validate,
  getProjectById
);

router.put(
  "/:id",
  protect,
  [
    param("id").isMongoId().withMessage("Invalid project ID"),
    body("title").optional().isString(),
    body("description").optional().isString(),
  ],
  validate,
  updateProject
);

router.delete(
  "/:id",
  protect,
  [param("id").isMongoId().withMessage("Invalid project ID")],
  validate,
  deleteProject
);

module.exports = router;