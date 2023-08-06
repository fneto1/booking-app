const express = require("express");
const Hotel = require("../Models/Hotel");
const {
  createHotel,
  getHotel,
  getHotels,
  updateHotel,
  deleteHotel,
  countByCity,
  countByType,
  getHotelRooms,
} = require("../Controllers/hotelController");
const { verifyAdmin } = require("../utils/verifyToken");

const router = express.Router();

router.get("/countbycity", countByCity);

router.get("/countbytype", countByType);

//CREATE
router.post("/", verifyAdmin, createHotel);

//GET
router.get("/find/:id", getHotel);
router.get("/room/:id", getHotelRooms);

//GET ALL
router.get("/", getHotels);

//UPDATE
router.put("/:id", verifyAdmin, updateHotel);

//DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

module.exports = router;
