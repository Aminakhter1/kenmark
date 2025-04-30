
const Note = require("../models/Note");

// @desc    Create new note
// @route   POST /api/notes
// @access  Private
exports.createNote = async (req, res) => {
  const { title, content } = req.body;

  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const note = new Note({
      user: req.user.userId,
      title,
      content,
    });

    await note.save();

    res.status(201).json(note);
  } catch (err) {
    console.error("Error saving note:", err);
    res.status(500).json({ message: "Server Error while saving note" });
  }
};
