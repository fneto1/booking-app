const express = require("express");
const Hotel = require("../Models/Hotel");
const {
  createHotel,
  getHotel,
  getHotels,
  updateHotel,
  deleteHotel,
} = require("../Controllers/hotelController");
const { verifyAdmin } = require("../utils/verifyToken");

const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createHotel);

//GET
router.get("/:id", getHotel);

//GET ALL
router.get("/", getHotels);

//UPDATE
router.put("/:id", verifyAdmin, updateHotel);

//DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

module.exports = router;
