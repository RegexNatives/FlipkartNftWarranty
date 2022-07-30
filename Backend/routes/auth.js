const router = require("express").Router();
const user = require("../controllers/auth.controller");

router.post("/all", user.all);
router.post("/login", user.login);
router.post("/register", user.register);
router.post('/verifyToken',user.verifyToken);


module.exports = router;
