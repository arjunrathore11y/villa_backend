require("dotenv").config();

const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");


const mongoURI = process.env.MONGODB_URI;

mongoose.connect(`${mongoURI}/villas`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => dbgr("✅ MongoDB connected"))
.catch((err) => dbgr("❌ MongoDB connection error:", err));

mongoose.connection.on("disconnected", () => {
  dbgr("MongoDB disconnected");
});

module.exports = mongoose.connection;





// mongodb+srv://arjunrathore9926:admin@cluster0.uy84d0m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0