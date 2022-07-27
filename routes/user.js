const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../services/auth");
const { checkRole } = require("../services/checkRole");
const {
  register,
  login,
  forgotPassword,
  getUsers,
  activeAccount,
  checkToken,
  changePassword,
} = require("../controllers/user");

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/change-password", authenticateToken, changePassword);

router.patch("/active-account", authenticateToken, activeAccount);

router.get("/get", authenticateToken, checkRole, getUsers);
router.get("/check-token", checkToken);

module.exports = router;
