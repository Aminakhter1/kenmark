
// routes/noteRoutes.js
const express = require('express');
const router = express.Router();
const {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
} = require('../controllers/noteController');
const protect = require('../middleware/authMiddleware');
router.use(protect); // protect all note routes

router.get('/', getNotes);
router.get('/:id', getNote);
router.post('/add', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;
