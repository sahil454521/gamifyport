const express = require("express");
const {
  getPortfolio,
  getProjects,
  getSkills
} = require("../controllers/portfolio.controller");

const router = express.Router();

router.get("/portfolio", getPortfolio);
router.get("/projects", getProjects);
router.get("/skills", getSkills);

module.exports = router;
