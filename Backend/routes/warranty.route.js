const router = require("express").Router();
const Warranty = require("../controllers/warranty.controller");
const middlewareAuth = require("../middleware/auth");
const isVendor = require("../middleware/isVendor");

router.post("/create", middlewareAuth, Warranty.createWarrantyRequest);
router.get("/status/:orderId", middlewareAuth, Warranty.getWarrantyStatus);

router.put("/status/:id", isVendor, Warranty.updateWarrantyStatus);
router.get(
  "/vendor/getWarrantyRequests",
  isVendor,
  Warranty.getWarrantyRequests
);

module.exports = router;
