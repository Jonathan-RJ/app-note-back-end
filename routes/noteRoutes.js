import express from 'express';
import { NoteController } from '../controller/noteController.js';
import { validateSchema } from '../middleware/validationMiddlewareNote.js'; // Importar el middleware de validación
import { noteSchema } from '../schemas/noteScehemas.js';

const router = express.Router();
const noteController = new NoteController();

// Definir las rutas y asociar el middleware y los métodos del controlador
router.post( `/notes`, validateSchema(noteSchema), (req, res) => noteController.createNote(req, res));
router.get( `/notes`, (req, res) => noteController.getAllNotes(req, res));
router.get( `/notes/:id`, (req, res) => noteController.getByIdNote(req, res));
router.put( `/notes/:id`, validateSchema(noteSchema), (req, res) => noteController.updateNote(req, res));
router.delete( `/notes/:id`, (req, res) => noteController.deleteByIdNote(req, res));

export default router;
