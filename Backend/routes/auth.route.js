const router = require("express").Router();
const user = require("../controllers/auth.controller");
const middlewareAuth = require("../middleware/auth");

router.get("/all", middlewareAuth, user.all);
router.post("/login", user.login);
router.post("/login/vendor", user.loginVendor);
router.post("/login/admins", user.loginAdmin);
router.post("/register", user.register);
router.post("/verifyToken", user.verifyToken);

module.exports = router;
