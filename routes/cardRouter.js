const express = require("express");
const router = express.Router();
const { createCard , getCard , upload, updateCard, deleteCard } = require("../controllers/cardControllers");

router.post("/create", upload.array("images", 5), createCard);

router.get("/allCards" , getCard );

router.post("/update/:_id" ,upload.array("images", 5), updateCard);

router.delete('/delete/:_id' , deleteCard);

module.exports = router;
