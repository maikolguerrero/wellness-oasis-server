const bookingsModel = require('../models/bookings.model');
const servicesModel = require('../models/services.model');

class BookingsController {
  // Agregar Reserva
  async add(req, res) {
    const { name, email, service_id, date, time } = req.body;

    try {

      // Verificar si el servicio existe
      const existingService = await servicesModel.getById(service_id);
      if (!existingService) return res.status(404).json({ status: 404, message: 'Servicio no encontrado.' });

      const newBookingId = await bookingsModel.add({ name, email, service_id, date, time });
      res.status(201).json({ status: 201, message: 'Reserva creada exitosamente.', data: { id: newBookingId } });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al crear la reserva: ${error.message}` });
    }
  }

  // Obtener todas las reservas
  async getAll(req, res) {
    try {
      const bookings = await bookingsModel.getAll();
      res.status(200).json({ status: 200, message: 'Reservas obtenidas correctamente.', data: { bookings } });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al obtener las reservas: ${error.message}` });
    }
  }

  // Obtener reserva por ID
  async getById(req, res) {
    const id = req.params.id;

    try {
      const booking = await bookingsModel.getById(id);
      if (!booking) return res.status(404).json({ status: 404, message: 'Reserva no encontrada.' });

      res.status(200).json({ status: 200, message: 'Reserva encontrada.', data: { booking } });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al obtener la reserva: ${error.message}` });
    }
  }

  // Actualizar reserva por ID
  async updateByID(req, res) {
    const id = req.params.id;
    const { name, email, service_id, date, time } = req.body;

    try {
      // Verificar si la reserva existe
      const existingBooking = await bookingsModel.getById(id);
      if (!existingBooking) return res.status(404).json({ status: 404, message: 'Reserva no encontrada.' });

      const success = await bookingsModel.updateByID(id, { name, email, service_id, date, time });
      if (!success) return res.status(500).json({ status: 500, message: 'Error al actualizar la reserva.' });

      res.status(200).json({ status: 200, message: 'Reserva actualizada exitosamente.' });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al actualizar la reserva: ${error.message}` });
    }
  }

  // Eliminar reserva por ID
  async deleteByID(req, res) {
    const id = req.params.id;

    try {
      // Verificar si la reserva existe
      const existingBooking = await bookingsModel.getById(id);
      if (!existingBooking) return res.status(404).json({ status: 404, message: 'Reserva no encontrada.' });

      const success = await bookingsModel.deleteByID(id);
      if (!success) return res.status(500).json({ status: 500, message: 'Error al eliminar la reserva.' });

      res.status(200).json({ status: 200, message: 'Reserva eliminada exitosamente.' });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al eliminar la reserva: ${error.message}` });
    }
  }
}

const bookingsController = new BookingsController();
module.exports = bookingsController;