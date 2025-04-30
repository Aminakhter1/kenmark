
const express = require("express");
const router = express.Router();
const { createNote } = require("../controllers/noteController");
const protect = require("../middleware/authMiddleware");

router.post("/", protect, createNote);

module.exports = router;
