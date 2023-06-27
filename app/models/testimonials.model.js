// models/testimonials.model.js
const query = require('../../config/query');

class TestimonialsModel {
  // Agregar un testimonio
  async add({ name, email, testimonial }) {
    const sql = 'INSERT INTO testimonials (name, email, testimonial) VALUES (?, ?, ?)';
    const values = [name, email, testimonial];
    try {
      const response = await query(sql, values);
      const newTestimonialId = response.insertId;
      return newTestimonialId;
    } catch (error) {
      console.log('Hubo un error al agregar el testimonio:', error);
      throw error;
    }
  }

  // Obtener todos los testimonios
  async getAll() {
    const sql = 'SELECT * FROM testimonials';
    try {
      const testimonials = await query(sql);
      return testimonials;
    } catch (error) {
      console.log('Hubo un error al obtener los testimonios:', error);
      throw error;
    }
  }

  // Obtener un testimonio por ID
  async getById(id) {
    const sql = 'SELECT * FROM testimonials WHERE id = ?';
    const values = [id];
    try {
      const [testimonial] = await query(sql, values);
      return testimonial;
    } catch (error) {
      console.log(`Hubo un error al obtener el testimonio con ID ${id}:`, error);
      throw error;
    }
  }

  // Actualizar un testimonio por ID
  async updateById(id, { name, email, testimonial }) {
    const sql = 'UPDATE testimonials SET name = ?, email = ?, testimonial = ? WHERE id = ?';
    const values = [name, email, testimonial, id];
    try {
      const response = await query(sql, values);
      return response.affectedRows > 0;
    } catch (error) {
      console.log(`Hubo un error al actualizar el testimonio con ID ${id}:`, error);
      throw error;
    }
  }

  // Eliminar un testimonio por ID
  async deleteById(id) {
    const sql = 'DELETE FROM testimonials WHERE id = ?';
    const values = [id];
    try {
      const response = await query(sql, values);
      return response.affectedRows > 0;
    } catch (error) {
      console.log(`Hubo un error al eliminar el testimonio con ID ${id}:`, error);
      throw error;
    }
  }
}

const testimonialsModel = new TestimonialsModel();
module.exports = testimonialsModel;