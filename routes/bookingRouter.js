const express = require("express");
const router = express.Router();
const  { bookVilla, showBooking } = require ("../controllers/bookController");


router.post ("/book/:_id" , bookVilla);

router.get ("/show" , showBooking);


module.exports = router;