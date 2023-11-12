const routes = require('express').Router();
const orderController = require("../../controller/order.controller");

// Dashboard User Login / Signin
routes.post("/create", orderController.create);

// Dashboard User Login / Signin
routes.get("/markSold", orderController.sold);

// Dashboard User Login / Signin
routes.get("/getAllOrders", orderController.getAllOrders);

// Dashboard User Login / Signin
routes.get("/getTotalInsight", orderController.getTotal);

module.exports = routes;