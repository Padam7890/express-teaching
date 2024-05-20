const express = require("express");
const createrepair = require("../controllers/repairController/create.controller");
const getRepairs = require("../controllers/repairController/index.controller");
const checkauth = require("../middleware/checkauth");
const router = express.Router();

router.post("/", createrepair )
router.get("/", checkauth, getRepairs );


module.exports =router;


