const express = require("express");
const Room = require("../Models/Room");
const {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
} = require("../Controllers/roomController");
const { verifyAdmin } = require("../utils/verifyToken");

const router = express.Router();

//CREATE
router.post("/:hotelId", verifyAdmin, createRoom);

//GET
router.get("/:id", getRoom);

//GET ALL
router.get("/", getRooms);

//UPDATE
router.put("/:id", verifyAdmin, updateRoom);

//DELETE
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom);

module.exports = router;
