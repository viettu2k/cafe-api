const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../services/auth");
const { checkRole } = require("../services/checkRole");
const {
  generateReport,
  getPDF,
  getBills,
  deleteBill,
} = require("../controllers/bill");

router.post("/generate-report", authenticateToken, checkRole, generateReport);
router.post("/get-pdf", authenticateToken, checkRole, getPDF);

// router.patch("/update", authenticateToken, checkRole, updateCategory);

router.get("/get-bills", authenticateToken, getBills);

router.delete("/delete/:id", authenticateToken, checkRole, deleteBill);

module.exports = router;
