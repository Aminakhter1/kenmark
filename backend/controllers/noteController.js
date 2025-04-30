
// controllers/noteController.js

// controllers/authController.js
const Note = require('../models/Note');
// Get all notes for logged-in user
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.userId }).sort({ updatedAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single note
exports.getNote = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user.userId });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create note
exports.createNote = async (req, res) => {
  const { title, content } = req.body;
  console.log(req.user.usetId);

  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const note = new Note({
      user: req.user.userId,
      title,
      content,
    });

    await note.save(); // Save to MongoDB
console.log(note);
    res.status(201).json(note);
  } catch (err) {
    console.error("Error saving note:", err);
    res.status(500).json({ message: "Server Error while saving note" });
  }
};


// Update note
exports.updateNote = async (req, res) => {
  const { title, content } = req.body;
  try {
    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      { title, content },
      { new: true }
    );
    if (!updatedNote) return res.status(404).json({ message: 'Note not found' });
    res.status(200).json(updatedNote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete note
exports.deleteNote = async (req, res) => {
  try {
    const deleted = await Note.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
    if (!deleted) return res.status(404).json({ message: 'Note not found' });
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
