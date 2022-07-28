const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../services/auth");
const { checkRole } = require("../services/checkRole");
const {
  addCategory,
  getCategories,
  updateCategory,
} = require("../controllers/category");

router.post("./add", authenticateToken, checkRole, addCategory);

router.patch("/update", authenticateToken, checkRole, updateCategory);

router.get("/get", authenticateToken, getCategories);

module.exports = router;
