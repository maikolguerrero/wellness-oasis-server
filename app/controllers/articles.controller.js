const articlesModel = require('../models/articles.model');
const path = require('path');
const { deleteImage } = require('../../config/multer');

class ArticlesController {
  // Crear un nuevo artículo
  async add(req, res) {
    const { title, content } = req.body;

    // Obtener la ruta de la imagen
    const imagePath = req.file.path;
    // Obtener el nombre de la imagen
    const image = path.basename(imagePath);

    try {
      // Verificar si ya existe un artículo con el mismo título
      const existingTitle = await articlesModel.getByTitle(title);
      if (existingTitle) {
        deleteImage(imagePath);
        return res.status(400).json({ status: 400, message: 'Ya existe un artículo con ese título.' });
      }

      // Crear el nuevo artículo
      const newArticle = { title, content, image };
      const newArticleId = await articlesModel.add(newArticle);

      res.status(201).json({ status: 201, message: 'Artículo creado exitosamente.', data: { id: newArticleId } });
    } catch (error) {
      deleteImage(imagePath);
      res.status(500).json({ status: 500, message: `Error al crear el artículo: ${error.message}` });
    }
  }

  // Obtener todos los artículos
  async getAll(req, res) {
    try {
      const articles = await articlesModel.getAll();
      res.status(200).json({ status: 200, message: 'Artículos obtenidos correctamente.', data: { articles } });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al obtener los artículos: ${error.message}` });
    }
  }

  // Obtener un artículo por ID
  async getById(req, res) {
    try {
      const id = req.params.id;

      const article = await articlesModel.getById(id);
      if (!article) return res.status(404).json({ status: 404, message: 'Artículo no encontrado.' });

      res.status(200).json({ status: 200, message: 'Artículo encontrado.', data: { article } });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al obtener el artículo: ${error.message}` });
    }
  }

  // Actualizar un artículo por ID
  async updateById(req, res) {
    try {
      const id = req.params.id;
      const { title, content } = req.body;

      // Verificar si el artículo existe
      const existingArticle = await articlesModel.getById(id);
      if (!existingArticle) return res.status(404).json({ status: 404, message: 'Artículo no encontrado.' });

      // Obtener la ruta de la imagen
      const folder = `../../static/images/${existingArticle.image}`;
      const imagePath = req.file?.path ?? path.join(__dirname, folder);

      // Verificar si ya existe un artículo con el mismo título
      if (title && title !== existingArticle.title) {
        const existingTitle = await articlesModel.getByTitle(title);
        if (existingTitle) {
          deleteImage(imagePath);
          return res.status(400).json({ status: 400, message: 'Ya existe un artículo con ese título.' });
        }
      }

      // Eliminar imagen anterior si se va a actualizar
      if (req.file && req.file?.path) {
        const imageExisting = path.join(__dirname, folder);
        deleteImage(imageExisting);
      }

      // Datos del artículo actualizados
      const updatedArticle = {
        title: title ?? existingArticle.title,
        content: content ?? existingArticle.content,
        image: req.file?.path ? path.basename(imagePath) : existingArticle.image
      };

      // Actualizar el artículo
      const affectedRows = await articlesModel.updateById(id, updatedArticle);

      if (affectedRows > 0) return res.status(200).json({ status: 200, message: 'Artículo actualizado exitosamente.' });

      deleteImage(imagePath);
      res.status(500).json({ status: 500, message: 'Error al actualizar el artículo.' });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al actualizar el artículo: ${error.message}` });
    }
  }

  // Eliminar un artículo por ID
  async deleteById(req, res) {
    try {
      const id = req.params.id;

      // Verificar si el artículo existe
      const existingArticle = await articlesModel.getById(id);
      if (!existingArticle) return res.status(404).json({ status: 404, message: 'Artículo no encontrado.' });

      // Eliminar artículo
      const affectedRows = await articlesModel.deleteById(id);
      if (affectedRows === 0) return res.status(404).json({ status: 404, message: 'Artículo no encontrado.' });

      // Eliminar la imagen
      const folder = `../../static/images/${existingArticle.image}`;
      const imagePath = path.join(__dirname, folder);
      deleteImage(imagePath);

      res.status(200).json({ status: 200, message: 'Artículo eliminado exitosamente.' });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al eliminar el artículo: ${error.message}` });
    }
  }
}

const articlesController = new ArticlesController();
module.exports = articlesController;