const router = require("express").Router();
const products = require("../controllers/products.controller");

router.get("/all", products.getAllProducts);
router.post("/add", products.addProduct);
module.exports = router;
