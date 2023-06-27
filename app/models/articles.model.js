const query = require('../../config/query');

class ArticlesModel {
  // Crear un nuevo artículo
  async add({ title, content, image }) {
    const sql = 'INSERT INTO articles (title, content, image) VALUES (?, ?, ?)';
    const values = [title, content, image];
    try {
      const response = await query(sql, values);
      const newArticleId = response.insertId;
      return newArticleId;
    } catch (error) {
      console.log('Hubo un error al crear el artículo:', error);
      throw error;
    }
  }

  // Obtener todos los artículos
  async getAll() {
    const sql = 'SELECT * FROM articles';
    try {
      const articles = await query(sql);
      return articles;
    } catch (error) {
      console.log('Hubo un error al obtener los artículos:', error);
      throw error;
    }
  }

  // Obtener un artículo por ID
  async getById(id) {
    const sql = 'SELECT * FROM articles WHERE id = ?';
    const values = [id];
    try {
      const [article] = await query(sql, values);
      return article;
    } catch (error) {
      console.log(`Hubo un error al obtener el artículo con ID ${id}:`, error);
      throw error;
    }
  }

  // Obtener un artículo por título
  async getByTitle(title) {
    const sql = 'SELECT * FROM articles WHERE title = ?';
    const values = [title];
    try {
      const [article] = await query(sql, values);
      return article;
    } catch (error) {
      console.log(`Hubo un error al obtener el artículo con título ${title}:`, error);
      throw error;
    }
  }

  // Actualizar un artículo por ID
  async updateById(id, { title, content, image }) {
    const sql = 'UPDATE articles SET title = ?, content = ?, image = ? WHERE id = ?';
    const values = [title, content, image, id];
    try {
      const response = await query(sql, values);
      const affectedRows = response.affectedRows;
      return affectedRows;
    } catch (error) {
      console.log(`Hubo un error al actualizar el artículo con ID ${id}:`, error);
      throw error;
    }
  }

  // Eliminar un artículo por ID
  async deleteById(id) {
    const sql = 'DELETE FROM articles WHERE id = ?';
    const values = [id];
    try {
      const response = await query(sql, values);
      const affectedRows = response.affectedRows;
      return affectedRows;
    } catch (error) {
      console.log(`Hubo un error al eliminar el artículo con ID ${id}:`, error);
      throw error;
    }
  }
}

const articlesModel = new ArticlesModel();
module.exports = articlesModel;