const router = require('express').Router();
const servicesController = require('../controllers/services.controller');
// Importamos la configuración del middleware de multer para subir archivos
const { upload } = require('../../config/multer');

router.post('/', upload.single('image'), servicesController.add); // Ruta para crear un nuevo servicio
router.get('/', servicesController.getAll); // Ruta para obtener todos los servicios
router.get('/:id', servicesController.getById); // Ruta para obtener un servicio por su ID
router.get('/name/:name', servicesController.getByName); // Ruta para obtener un servicio por su nombre
router.put('/:id', upload.single('image'), servicesController.updateById); // Ruta para editar un servicio por su ID
router.delete('/:id', servicesController.deleteById); // Ruta para eliminar un servicio por su ID

module.exports = router;