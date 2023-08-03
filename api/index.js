const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const hotelsRoutes = require("./routes/hotels");
const roomsRoutes = require("./routes/rooms");
const usersRoutes = require("./routes/users");

dotenv.config();
const app = express();

const db = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO)
      .then(() => console.log("Conectado ao MongoDB"));
  } catch (error) {
    //observa a conexão no lado do backend
    console.log(error);
  }
};

//middlewares
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/hotels", hotelsRoutes);
app.use("/api/rooms", roomsRoutes);

app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: error.stack,
  });
});

//--- Observa a conexão no lado do db server
mongoose.connection.on("disconnected", () => {
  console.log("Desconectado do MongoDB");
});

// mongoose.connection.on("connected", () => {
//   console.log("Conectado do MongoDB");
// });
//----

app.listen(8800, () => {
  db();
  console.log("Backend iniciado");
});
