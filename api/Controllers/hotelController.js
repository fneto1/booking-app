const Hotel = require("../Models/Hotel");
const Room = require("../Models/Room");

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
    const { min, max, ...others } = req.query;
    const hotels = await Hotel.find({
      city: req.query.city,
      featured: req.query.featured,
      cheapestPrice: {
        $gt: min | 1,
        $lt: max || 999,
      },
    }).limit(req.query.limit);

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

//GET by city
const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  //console.log(cities);
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );

    //console.log(list);

    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

//GET by type
const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villasCount = await Hotel.countDocuments({ type: "villas" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "Hotels", count: hotelCount },
      { type: "Apartments", count: apartmentCount },
      { type: "Resorts", count: resortCount },
      { type: "Villas", count: villasCount },
      { type: "Cabins", count: cabinCount },
    ]);
  } catch (error) {
    next(error);
  }
};

const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createHotel,
  getHotel,
  getHotels,
  updateHotel,
  deleteHotel,
  countByCity,
  countByType,
  getHotelRooms,
};
