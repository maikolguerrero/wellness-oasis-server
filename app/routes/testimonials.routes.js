// routes/testimonials.routes.js
const router = require('express').Router();

// Importar el controlador de testimonios
const testimonialsController = require('../controllers/testimonials.controller');

router.post('/', testimonialsController.add); // Ruta para agregar un testimonio
router.get('/', testimonialsController.getAll); // Ruta para obtener todos los testimonios
router.get('/:id', testimonialsController.getById); // Ruta para obtener un testimonio por su ID
router.put('/:id', testimonialsController.updateById); // Ruta para actualizar un testimonio por su ID
router.delete('/:id', testimonialsController.deleteById); // Ruta para eliminar un testimonio por su ID

module.exports = router;