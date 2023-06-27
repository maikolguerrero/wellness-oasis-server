// controllers/testimonials.controller.js
const testimonialsModel = require('../models/testimonials.model');

class TestimonialsController {
  // Agregar un testimonio
  async add(req, res) {
    try {
      const { name, email, testimonial } = req.body;

      const newTestimonialId = await testimonialsModel.add({ name, email, testimonial });
      res.status(201).json({ status: 201, message: 'Testimonio agregado exitosamente.', data: { id: newTestimonialId } });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al agregar el testimonio: ${error.message}` });
    }
  }

  // Obtener todos los testimonios
  async getAll(req, res) {
    try {
      const testimonials = await testimonialsModel.getAll();
      res.status(200).json({ status: 200, data: testimonials });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al obtener los testimonios: ${error.message}` });
    }
  }

  // Obtener un testimonio por ID
  async getById(req, res) {
    try {
      const id = req.params.id;

      const testimonial = await testimonialsModel.getById(id);
      if (!testimonial) return res.status(404).json({ status: 404, message: 'Testimonio no encontrado.' });

      res.status(200).json({ status: 200, data: testimonial });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al obtener el testimonio: ${error.message}` });
    }
  }

  // Actualizar un testimonio por ID
  async updateById(req, res) {
    try {
      const id = req.params.id;
      const { name, email, testimonial } = req.body;

      // Verificar si el testimonio existe
      const existingTestimonial = await testimonialsModel.getById(id);
      if (!existingTestimonial) return res.status(404).json({ status: 404, message: 'Testimonio no encontrado.' });

      const success = await testimonialsModel.updateById(id, { name, email, testimonial });
      if (!success) return res.status(500).json({ status: 500, message: 'Error al actualizar el testimonio.' });

      res.status(200).json({ status: 200, message: 'Testimonio actualizado exitosamente.' });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al actualizar el testimonio: ${error.message}` });
    }
  }

  // Eliminar un testimonio por ID
  async deleteById(req, res) {
    try {
      const id = req.params.id;

      // Verificar si el testimonio existe
      const existingTestimonial = await testimonialsModel.getById(id);
      if (!existingTestimonial) return res.status(404).json({ status: 404, message: 'Testimonio no encontrado.' });

      const success = await testimonialsModel.deleteById(id);
      if (!success) return res.status(500).json({ status: 500, message: 'Error al eliminar el testimonio.' });

      res.status(200).json({ status: 200, message: 'Testimonio eliminado exitosamente.' });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al eliminar el testimonio: ${error.message}` });
    }
  }
}

const testimonialsController = new TestimonialsController();
module.exports = testimonialsController;