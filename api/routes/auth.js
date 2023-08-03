const express = require("express");
const { register, login } = require("../Controllers/authController");
//import express from "express";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

//export default router;
module.exports = router;
