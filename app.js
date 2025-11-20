const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const db = require("./config/mongoose-connection")
const usersRouter = require("./routes/userRouter");
const cardRouter = require("./routes/cardRouter");
const bookingRouter = require("./routes/bookingRouter")

require("dotenv").config();
const cors = require("cors");

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));



app.use("/users", usersRouter);
app.use("/cards", cardRouter);
app.use("/booking", bookingRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});