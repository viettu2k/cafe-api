const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../services/auth");
const { checkRole } = require("../services/checkRole");
const {
  register,
  login,
  forgotPassword,
  getUsers,
  updateStatus,
  checkToken,
  changePassword,
} = require("../controllers/user");

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/change-password", authenticateToken, changePassword);

router.patch("/update", authenticateToken, updateStatus);

router.get("/get", authenticateToken, checkRole, getUsers);
router.get("/check-token", checkToken);

module.exports = router;
