const router = require("express").Router();
const Avail = require("../controllers/avail.controller");
const middlewareAuth = require("../middleware/auth");
const isVendor = require("../middleware/isVendor");

router.post("/create",middlewareAuth, Avail.createAvailRequest);

router.get("/status/:token",middlewareAuth, Avail.getAvailStatus);

router.put("/status/:id",isVendor, Avail.updateAvailStatus);

router.get("/vendor/getAvailrequests",isVendor, Avail.getAvailRequests);


module.exports = router;
