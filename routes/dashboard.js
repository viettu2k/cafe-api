const express = require("express");
const { getDetails } = require("../controllers/dashboard");
const router = express.Router();
const { authenticateToken } = require("../services/auth");
const { checkRole } = require("../services/checkRole");

// router.post("/add", authenticateToken, checkRole);

// router.patch("/update", authenticateToken, checkRole);

router.get("/details", authenticateToken, getDetails);

module.exports = router;
