const query = require('../../config/query');

class ServicesModel {
  // Crear un nuevo servicio
  async add({ name, description, price, image, is_promotion = 0, discount = 0 }) {
    const sql = 'INSERT INTO services (name, description, price, image, is_promotion, discount) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [name, description, price, image, is_promotion, discount];
    try {
      const response = await query(sql, values);
      const newServiceId = response.insertId;
      return newServiceId;
    } catch (error) {
      console.log('Hubo un error al crear el servicio:', error);
      throw error;
    }
  }

  // Obtener todos los servicios
  async getAll() {
    const sql = 'SELECT * FROM services';
    try {
      const services = await query(sql);
      return services;
    } catch (error) {
      console.log('Hubo un error al obtener los servicios:', error);
      throw error;
    }
  }

  // Obtener un servicio por ID
  async getById(id) {
    const sql = 'SELECT * FROM services WHERE id = ?';
    const values = [id];
    try {
      const [service] = await query(sql, values);
      return service;
    } catch (error) {
      console.log(`Hubo un error al obtener el servicio con ID ${id}:`, error);
      throw error;
    }
  }

  // Obtener un servicio por nombre
  async getByName(name) {
    const sql = 'SELECT * FROM services WHERE name = ?';
    const values = [name];
    try {
      const [service] = await query(sql, values);
      return service;
    } catch (error) {
      console.log(`Hubo un error al obtener el servicio con nombre ${name}:`, error);
      throw error;
    }
  }

  // Editar un servicio por ID
  async updateById(id, { name, description, price, image, is_promotion, discount }) {
    const sql = 'UPDATE services SET name = ?, description = ?, price = ?, image = ?, is_promotion = ?, discount = ? WHERE id = ?';
    const values = [name, description, price, image, is_promotion, discount, id];
    try {
      const response = await query(sql, values);
      const affectedRows = response.affectedRows;
      return affectedRows;
    } catch (error) {
      console.log(`Hubo un error al actualizar el servicio con ID ${id}:`, error);
      throw error;
    }
  }

  // Eliminar un servicio por ID
  async deleteById(id) {
    const sql = 'DELETE FROM services WHERE id = ?';
    const values = [id];
    try {
      const response = await query(sql, values);
      const affectedRows = response.affectedRows;
      return affectedRows;
    } catch (error) {
      console.log(`Hubo un error al eliminar el servicio con ID ${id}:`, error);
      throw error;
    }
  }

}

const servicesModel = new ServicesModel();
module.exports = servicesModel;