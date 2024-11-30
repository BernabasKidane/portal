import express from 'express';
import { createNote, getNotes, updateNote, deleteNote } from '../controllers/noteController.js';

const router = express.Router();

// Route to get all notes or search notes
router.get('/', getNotes);

// Route to create a new note
router.post('/', createNote);

// Route to update a specific note
router.put('/:id', updateNote);

// Route to delete a specific note
router.delete('/:id', deleteNote);

export default router;
