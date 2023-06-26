const router = require('express').Router();

// Importar el controlador de administradores
const bookingsController = require('../controllers/bookings.controller');

router.post('/', bookingsController.add); // Ruta para agregar una reservación
router.get('/', bookingsController.getAll); // Ruta para obtener todas las reservas
router.get('/:id', bookingsController.getById); // Ruta para obtener una reserva por su ID
router.put('/:id', bookingsController.updateByID); // Ruta para actualizar una reserva por su ID
router.delete('/:id', bookingsController.deleteByID); // Ruta para eliminar una reserva por su ID

module.exports = router;