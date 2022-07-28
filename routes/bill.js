const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../services/auth");
const { checkRole } = require("../services/checkRole");
const { generateReport } = require("../controllers/bill");

router.post("/generateReport", authenticateToken, checkRole, generateReport);

// router.patch("/update", authenticateToken, checkRole, updateCategory);

// router.get("/get", authenticateToken, getCategories);

module.exports = router;
