const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("../utils/error");

const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  try {
    const newUser = new User({
      username: username,
      email: email,
      password: passwordHash,
    });

    await newUser.save();

    res.status(200).json({
      message: "User has been created",
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return next(createError(404, "User not found"));
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return next(createError(500, "Wrong password or username"));
    }

    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET
    );

    const { password, isAdmin, ...otherDetails } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...otherDetails });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
