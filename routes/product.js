const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../services/auth");
const { checkRole } = require("../services/checkRole");
const {
  addProduct,
  getProducts,
  getByCategoryId,
  updateProduct,
  deleteProduct,
  updateStatus,
} = require("../controllers/product");

router.post("/add", authenticateToken, checkRole, addProduct);

router.patch("/update", authenticateToken, checkRole, updateProduct);
router.patch("/updateStatus", authenticateToken, checkRole, updateStatus);

router.get("/get", authenticateToken, getProducts);
router.get("/getByCategory/:id", authenticateToken, getByCategoryId);
router.get("/getById/:id", authenticateToken, getByCategoryId);

router.delete("/delete/:id", authenticateToken, checkRole, deleteProduct);

module.exports = router;
