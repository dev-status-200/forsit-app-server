const routes = require('express').Router();
const inventoryController = require("../../controller/inventory.controller");

// Dashboard User Login / Signin
routes.post("/create", inventoryController.create);

// Dashboard User Login / Signin
routes.get("/getInventory", inventoryController.getAllItems);

// Dashboard User Login / Signin
routes.get("/getItem", inventoryController.getItem);

// Dashboard User Login / Signin
routes.get("/getRevenue", inventoryController.getRevenue);

// Dashboard User Login / Signin
routes.get("/getAllItemNames", inventoryController.getAllItemsNames);

// Dashboard User Login / Signin
routes.get("/getItemComparison", inventoryController.getComparison);

module.exports = routes;