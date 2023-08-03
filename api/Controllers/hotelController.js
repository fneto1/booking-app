const Hotel = require("../Models/Hotel");

//CREATE
const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();

    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

//GET HOTEL
const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

//GET ALL
const getHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();

    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

//UPDATE
const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedHotel);
  } catch (error) {
    next(error);
  }
};

//DELETE
const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Hotel has been deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createHotel, getHotel, getHotels, updateHotel, deleteHotel };
