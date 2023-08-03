const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  maxPeople: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  roomsNumbers: {
    type: [{ number: Number, unvailableDates: { type: [Date] } }],
  },
});

module.exports = mongoose.model("Room", RoomSchema);
