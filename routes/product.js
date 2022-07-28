const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../services/auth");
const { checkRole } = require("../services/checkRole");
const { addProduct, getProducts } = require("../controllers/product");

router.post("/add", authenticateToken, checkRole, addProduct);

router.get("/get", authenticateToken, getProducts);

module.exports = router;
