const express = require("express");
const {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../Controllers/userController");
const {
  verifyToken,
  verifyUser,
  verifyAdmin,
} = require("../utils/verifyToken");

const router = express.Router();

// router.get("/checkauth", verifyToken, (req, res) => {
//   res.status(200).json({ message: "hello" });
// });

// router.get("/checkuser/:id", verifyUser, (req, res) => {
//   res.status(200).json({ message: "hello user" });
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res) => {
//   res.status(200).json({ message: "hello admin" });
// });

//GET
router.get("/:id", verifyUser, getUser);

//GET ALL
router.get("/", verifyAdmin, getUsers);

//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);
module.exports = router;
