const router = require("express").Router();
const Order = require("../controllers/order.controller");

router.get("/all", Order.getAllOrders);
router.put("/status/:id", Order.updateStatus);
router.get("/products/:productId", Order.getOrderByProducts);

module.exports = router;