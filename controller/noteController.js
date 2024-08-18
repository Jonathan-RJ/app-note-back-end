import promisePool from '../config/db.js';
import logger from '../config/logger.js';

export class NoteController {

  async createNote(req, res) {
    const { title, content } = req.body;
    try {
      const [result] = await promisePool.query(
        'INSERT INTO notes (title, content) VALUES (?, ?)',
        [title, content]
      );
      logger.info('Note created', { title, content });
      res.status(201).json({
        message: 'Note created successfully',
        result:{
          id: result.insertId
        }
      });
    } catch (error) {
      logger.error('Error creating Note', { error: error });
      res.status(500).json({ message: 'Failed to create Note' });
    }
  }

  async getAllNotes(req, res) {
    try {
      const [result] = await promisePool.query(
        'SELECT id, title FROM notes'
      );

      logger.info('Note created');
      res.status(200).json({
        message: 'Notes gets successfully',
        result
      });
    } catch (error) {
      logger.error('Error gets Notes', { error: error });
      res.status(500).json({ message: 'Failed to get all Notes' });
    }
  }

  async getByIdNote (req, res) {
    const { id } = req.params;

    try {
      // Ejecutar la consulta para obtener la nota por ID
      const [rows] = await promisePool.query(
        'SELECT * FROM notes WHERE id = ?',
        [id]
      );

      // Verificar si se encontró la nota
      if (rows.length > 0) {
        logger.info(`Note with ID ${id} fetched successfully`);
        res.status(200).json({
          message: 'Note fetched successfully',
          note: rows[0] // Retornar la nota encontrada
        });
      } else {
        logger.warn(`Note with ID ${id} not found`);
        res.status(404).json({ message: 'Note not found' });
      }
    } catch (error) {
      logger.error('Error fetching note by ID', { error: error });
      res.status(500).json({ message: 'Failed to fetch note' });
    }
  }

  async updateNote (req, res) {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
      // Verificar si la nota existe
      const [rows] = await promisePool.query('SELECT * FROM notes WHERE id = ?', [id]);
      if (rows.length === 0) {
        logger.warn(`Note with ID ${id} not found`);
        return res.status(404).json({ message: 'Note not found' });
      }
      // Actualizar la nota
      const [result] = await promisePool.query(
        'UPDATE notes SET title = ?, content = ? WHERE id = ?',
        [title, content, id]
      );
      logger.info(`Note with ID ${id} updated successfully`);
      res.status(200).json({
        message: 'Note updated successfully'
      });
    } catch (error) {
      logger.error('Error updating note by ID', { error });
      res.status(500).json({ message: 'Failed to update note' });
    }
  }

  async deleteByIdNote (req, res) {
    const { id } = req.params;
  
    try {
      // Ejecutar la consulta para eliminar la nota por ID
      const [result] = await promisePool.query(
        'DELETE FROM notes WHERE id = ?',
        [id]
      );
  
      // Verificar si se ha eliminado alguna fila
      if (result.affectedRows > 0) {
        logger.info(`Note with ID ${id} deleted successfully`);
        res.status(200).json({
          message: 'Note deleted successfully'
        });
      } else {
        logger.warn(`Note with ID ${id} not found`);
        res.status(404).json({ message: 'Note not found' });
      }
    } catch (error) {
      logger.error('Error deleting note by ID', { error: error });
      res.status(500).json({ message: 'Failed to delete note' });
    }
  }
  

}
