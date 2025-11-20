const express = require("express");
const router = express.Router();

const{registerUser, loginUser, logoutUser, displayUser} = require("../controllers/authControllers");
const authMiddleware = require("../middleware/authMiddleware")

router.get("/", (req, res) => {
  res.send("hey");
});

router.post("/register", registerUser );

router.post("/login", loginUser );

router.post("/logout", logoutUser );

router.get("/profile",authMiddleware, displayUser);

module.exports = router;