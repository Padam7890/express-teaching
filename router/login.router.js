const express = require("express");
const login = require("../controllers/userController/login.controller");
const router = express.Router();

router.get("/",    login )


module.exports = router;
