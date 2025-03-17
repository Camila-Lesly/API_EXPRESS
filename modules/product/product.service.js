// services/product.service.js
const ProductModel = require('../models/product.model'); // Asumiendo que tienes un modelo de producto para la base de datos

class ProductService {
    // Obtener todos los productos
    static async getAllProducts() {
        try {
            const products = await ProductModel.find();  // Aquí asumo que usas algo como MongoDB con Mongoose
            return products;
        } catch (err) {
            throw new Error('Error al obtener los productos');
        }
    }

    // Obtener un producto por su ID
    static async getProductById(id) {
        try {
            const product = await ProductModel.findById(id);  // Asumiendo que usas MongoDB con Mongoose
            return product;
        } catch (err) {
            throw new Error('Error al obtener el producto');
        }
    }
}

module.exports = ProductService;
