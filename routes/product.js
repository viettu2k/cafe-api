const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../services/auth");
const { checkRole } = require("../services/checkRole");
const {
  addProduct,
  getProducts,
  getByCategoryId,
} = require("../controllers/product");

router.post("/add", authenticateToken, checkRole, addProduct);

router.get("/get", authenticateToken, getProducts);
router.get("/getByCategory/:id", authenticateToken, getByCategoryId);

module.exports = router;
