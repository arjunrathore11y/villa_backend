const cardModel = require("../models/card-model");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

module.exports.upload = multer({ storage: storage });

module.exports.createCard = async (req, res) => {
  try {
    const { name, location, country, guest, bedroom, area, bathroom, price } =
      req.body;

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image is required" });
    }

    const images = req.files.map((file) => file.filename);

    const createdCard = await cardModel.create({
      name,
      location,
      country,
      guest,
      bedroom,
      area,
      bathroom,
      price,
      image: images,
    });

    res.status(201).json(createdCard);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

module.exports.getCard = async (req, res) => {
  try {
    const allCard = await cardModel.find();

    res.status(201).send(allCard);
  } catch (error) {
    res.status(500).send("Something Went Wrong");
  }
};

module.exports.updateCard = async (req, res) => {
  try {
    const { name, location, country, guest, bedroom, area, bathroom, price } =
      req.body;

    const images = req.files ? req.files.map((file) => file.filename) : [];

    if (!req.params._id) {
      return res.status(400).json({ message: "Card ID is required" });
    }

    const updateCard = await cardModel.findByIdAndUpdate(
    req.params._id ,
      {
        name,
        location,
        country,
        guest,
        bedroom,
        area,
        bathroom,
        price,
        image: images,
      },
      { new: true }
    );

    if (!updateCard) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.status(201).json(updateCard);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

module.exports.deleteCard = async (req, res) => {
  try {
    const deletedCard = await cardModel.findByIdAndDelete(req.params._id);

    if (!deletedCard) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.status(200).json({ message: "Card deleted successfully", data: deletedCard });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};