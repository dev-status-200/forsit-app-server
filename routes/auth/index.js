const routes = require('express').Router();
const authController = require("../../controller/auth.controller");
const verify = require("../../functions/tokenVerification")

// Dashboard User Login / Signin
routes.get("/login", authController.login);

// Verify Dashboard User Login
routes.get("/verifyLogin", verify, authController.verifyToken);

module.exports = routes;