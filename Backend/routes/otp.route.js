const router = require("express").Router();
const otp = require("../controllers/otp.controller");
const middlewareAuth = require("../middleware/auth");

router.post("/initiateTransfer", middlewareAuth, otp.initiateTransfer);
router.post("/completeTransfer", middlewareAuth, otp.completeTransfer);
router.post("/sendConfirmation", middlewareAuth, otp.sendConfirmation);

module.exports = router;
