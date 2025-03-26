(function () {
    'use strict';

    var ProductModel = require('./product.module')().ProductModel;

    module.exports = {
        createProduct: createProduct,
        updateProduct: updateProduct,
        getProduct: getProduct,
        deleteProduct: deleteProduct
    };

    // Función para crear un producto
    async function createProduct(productData) {
        var existingProduct = await ProductModel.findOne({ name: productData.name });
        if (existingProduct) {
            throw new Error('El producto ya existe');
        }

        var newProduct = new ProductModel(productData);
        return newProduct.save();
    }

    // Función para obtener un producto por ID
    async function getProduct(id) {
        try {
            return await ProductModel.findById(id);
        } catch (error) {
            return null;
        }
    }

    // Función para actualizar un producto
    function updateProduct(productId, productData) {
        return ProductModel
            .findByIdAndUpdate(productId, productData, { new: true })
            .exec();
    }

    // Función para eliminar un producto
    function deleteProduct(productId) {
        return ProductModel.findByIdAndDelete(productId)
            .exec()
            .then(deletedProduct => {
                if (!deletedProduct) {
                    const error = new Error('Producto no encontrado');
                    error.status = 404;
                    throw error;
                }

                return {
                    message: 'Producto eliminado exitosamente',
                    product: deletedProduct
                };
            });
    }
})();
