const User = require("../Models/User");

//GET User
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

//GET ALL
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json(Users);
  } catch (error) {
    next(error);
  }
};

//UPDATE
const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

//DELETE
const deleteUser = async (req, res, next) => {
  try {
    await user.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "User has been deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUser, getUsers, updateUser, deleteUser };
