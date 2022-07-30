const router = require("express").Router();
const Warranty = require("../controllers/warranty.controller");

router.post("/create", Warranty.createWarrantyRequest);
router.get("/status/:orderId/:type", Warranty.getWarrantyStatus);
router.put("/status/:id", Warranty.updateWarrantyStatus);

module.exports = router;