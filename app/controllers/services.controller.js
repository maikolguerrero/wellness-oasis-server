const servicesModel = require('../models/services.model');
const path = require('path');
const { deleteImage } = require('../../config/multer');

class ServicesController {
  // Crear un nuevo servicio
  async add(req, res) {
    const { name, description, price, is_promotion, discount } = req.body;

    // Obtenemos la ruta de la imagen
    const imagePath = req.file.path;
    // Obtenemos el nombre de la imagen
    const image = path.basename(imagePath);

    // Verificar si ya existe un servicio con el mismo nombre
    const existingName = await servicesController.getByName(name);
    if (existingName) {
      deleteImage(imagePath);
      return res.status(400).json({ status: 400, message: 'Ya existe un servicio con ese nombre.' });
    }

    try {
      // Crear el nuevo servicio
      const newService = { name, description, price, image, is_promotion, discount };
      const newServiceId = await servicesModel.add(newService);

      res.status(201).json({ status: 201, message: 'Servicio creado exitosamente.', data: { id: newServiceId } });
    } catch (error) {
      deleteImage(imagePath);
      res.status(500).json({ status: 500, message: `Error al crear el servicio: ${error.message}` });
    }
  }

  // Obtener todos los servicios
  async getAll(req, res) {
    try {
      const services = await servicesModel.getAll();
      res.status(200).json({ status: 200, message: 'Servicios obtenidos correctamente.', data: { services } });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al obtener los servicios: ${error.message}` });
    }
  }

  // Obtener un servicio por ID
  async getById(req, res) {
    const id = req.params.id;

    try {
      const service = await servicesModel.getById(id);
      if (!service) return res.status(404).json({ status: 404, message: 'Servicio no encontrado.' });

      res.status(200).json({ status: 200, message: 'Servicio encontrado.', data: { service } });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al obtener el servicio: ${error.message}` });

    }
  }

  // Obtener un servicio por nombre
  async getByName(req, res) {
    const name = req.params.name;

    try {
      const service = await servicesModel.getByName(name);
      if (!service) return res.status(404).json({ status: 404, message: 'Servicio no encontrado.' });
      res.status(200).json({ status: 200, message: 'Servicio encontrado.', data: { service } });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al obtener el servicio: ${error.message}` });
    }
  }

  // Editar un servicio por ID
  async updateById(req, res) {
    const id = req.params.id;
    const { name, description, price, is_promotion, discount } = req.body;

    // Verificar si el servicio existe
    const existingService = await servicesModel.getById(id);
    if (!existingService) return res.status(404).json({ status: 404, message: 'Servicio no encontrado.' });

    // Obtener la ruta de la imagen
    const folder = `../../static/images/${existingService.image}`;
    const imagePath = req.file?.path ?? path.join(__dirname, folder);

    try {
      // Eliminar imagen anterior si se va a actualizar
      if (req.file && req.file?.path) {
        const imageExisting = path.join(__dirname, folder);
        deleteImage(imageExisting);
      }

      // Datos del servicio actualizados
      const updatedService = {
        name: name ?? existingService.name,
        description: description ?? existingService.description,
        price: price ?? existingService.price,
        image: req.file?.path ? path.basename(imagePath) : existingService.image,
        is_promotion: is_promotion ?? existingService.is_promotion,
        discount: discount ?? existingService.discount
      };

      // Actualizar el servicio
      const affectedRows = await servicesModel.updateById(id, updatedService);

      if (affectedRows > 0) return res.status(200).json({ status: 200, message: 'Servicio actualizado exitosamente.' });

      deleteImage(imagePath)
      res.status(500).json({ status: 500, message: 'Error al actualizar el servicio.' });
    } catch (error) {
      deleteImage(imagePath)
      res.status(500).json({ status: 500, message: `Error al actualizar el servicio: ${error.message}` });
    }
  }

  // Eliminar un servicio por ID
  async deleteById(req, res) {
    const id = req.params.id;

    try {

      // Verificar si el servicio existe
      const existingService = await servicesModel.getById(id);
      if (!existingService) return res.status(404).json({ status: 404, message: 'Servicio no encontrado.' });

      // Eliminar servicio
      const affectedRows = await servicesModel.deleteById(id);
      if (affectedRows === 0) return res.status(404).json({ status: 404, message: 'Servicio no encontrado.' });

      // Eliminar la imagen
      const folder = `../../static/images/${existingService.image}`;
      const imagePath = path.join(__dirname, folder);
      deleteImage(imagePath);

      res.status(200).json({ status: 200, message: 'Servicio eliminado exitosamente.' });
    } catch (error) {
      res.status(500).json({ status: 500, message: `Error al eliminar el servicio: ${error.message}` });
    }
  }
}

const servicesController = new ServicesController();
module.exports = servicesController;