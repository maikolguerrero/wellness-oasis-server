const query = require('../../config/query');

class BookingsModel {
  // Agregar una reservación
  async add({ name, email, service_id, date, time }) {
    const sql = 'INSERT INTO bookings (name, email, service_id, date, time) VALUES (?, ?, ?, ?, ?)';
    const values = [name, email, service_id, date, time];
    try {
      const response = await query(sql, values);
      const newBookingId = response.insertId;
      return newBookingId;
    } catch (error) {
      console.log('Hubo un error al crear la reserva:', error);
      throw error;
    }
  }

  // Obtener todas las reservas
  async getAll() {
    const sql = 'SELECT * FROM bookings';
    try {
      const bookings = await query(sql);
      return bookings;
    } catch (error) {
      console.log('Hubo un error al obtener las reservas:', error);
      throw error;
    }
  }

  // Obtener reserva por ID
  async getById(id) {
    const sql = 'SELECT * FROM bookings WHERE id = ?';
    const values = [id];
    try {
      const [booking] = await query(sql, values);
      return booking;
    } catch (error) {
      console.log(`Hubo un error al obtener la reserva con ID ${id}:`, error);
      throw error;
    }
  }

  // Actualizar reserva por ID
  async updateByID(id, { name, email, service_id, date, time }) {
    const sql = 'UPDATE bookings SET name = ?, email = ?, service_id = ?, date = ?, time = ? WHERE id = ?';
    const values = [name, email, service_id, date, time, id];
    try {
      const response = await query(sql, values);
      return response.affectedRows > 0;
    } catch (error) {
      console.log(`Hubo un error al actualizar la reserva con ID ${id}:`, error);
      throw error;
    }
  }

  // Eliminar reserva por ID
  async deleteByID(id) {
    const sql = 'DELETE FROM bookings WHERE id = ?';
    const values = [id];
    try {
      const response = await query(sql, values);
      return response.affectedRows > 0;
    } catch (error) {
      console.log(`Hubo un error al eliminar la reserva con ID ${id}:`, error);
      throw error;
    }
  }
}

const bookingsModel = new BookingsModel();
module.exports = bookingsModel;