const bookingModel = require("../models/booking-model");
const bookModel = require("../models/booking-model");

module.exports.bookVilla = async (req, res) => {
  try {
    const { name, email, checkin, checkout, contact, guest, room } = req.body;
    const villaId = req.params._id; 


    const bookedVilla = await bookingModel.create({
      name,
      email,
      checkin,
      checkout,
      contact,
      guest,
      room,
      villaId, 
    });

    res.status(201).json(bookedVilla);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};



module.exports.showBooking = async (req, res) => {
  try {
    const showBook = await bookingModel.find()
      .populate("villaId", "name"); 

    res.status(200).json(showBook);
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong", error: error.message });
  }
};
