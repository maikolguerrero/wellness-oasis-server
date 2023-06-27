const router = require('express').Router();
const articlesController = require('../controllers/articles.controller');
// Importamos la configuración del middleware de multer para subir archivos
const { upload } = require('../../config/multer');

router.post('/', upload.single('image'), articlesController.add); // Ruta para crear un nuevo artículo
router.get('/', articlesController.getAll); // Ruta para obtener todos los artículos
router.get('/:id', articlesController.getById); // Ruta para obtener un artículo por su ID
router.put('/:id', upload.single('image'), articlesController.updateById); // Ruta para editar un artículo por su ID
router.delete('/:id', articlesController.deleteById); // Ruta para eliminar un artículo por su ID

module.exports = router;