const router = require("express").Router();
const Order = require("../controllers/order.controller");
const middlewareAuth = require("../middleware/auth");
const isVendor = require("../middleware/isVendor");

router.get("/all", middlewareAuth, Order.getAllOrders);
router.put("/status/:id", isVendor, Order.updateStatus);
router.get("/products/:productId", middlewareAuth, Order.getOrderByProducts);
router.post("/create", middlewareAuth, Order.createOrder);
router.get("/vendor/getAll", isVendor, Order.getAllOrdersByVendor);
router.post("/:id", middlewareAuth, Order.getOrderById);
router.get("/vendor/getAll", isVendor, Order.getAllOrdersByVendor);

module.exports = router;
