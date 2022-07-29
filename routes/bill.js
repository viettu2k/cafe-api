const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../services/auth");
const { checkRole } = require("../services/checkRole");
const { generateReport, getPDF } = require("../controllers/bill");

router.post("/generateReport", authenticateToken, checkRole, generateReport);

router.post("/getPDF", authenticateToken, checkRole, getPDF);

// router.patch("/update", authenticateToken, checkRole, updateCategory);

// router.get("/get", authenticateToken, getCategories);

module.exports = router;
