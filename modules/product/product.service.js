(function () {
    'use strict'

    var jwt = require('jsonwebtoken');
    var ProductModel = require('./product.module')().ProductModel;

    module.exports = {
        createProduct: createProduct,
        updateProduct: updateProduct,
        getProduct: getProduct,
        getProducts: getProducts,
        deleteProduct: deleteProduct
    };

    async function getProducts(userId) {
        try {
            return await ProductModel.find({ owner: userId });
        } catch (error) {
            return null;
        }
    }

    async function getProduct(id) {
        try {
            return await ProductModel.findById(id).select('-owner');
        } catch (error) {
            return null;
        }
    }

    async function createProduct(productData) {
        var newProduct = new ProductModel(productData);
        return newProduct.save();
    }

    function updateProduct(productId, product) {
        return ProductModel
            .findByIdAndUpdate(productId, product, { new: true })
            .exec();
    }

    function deleteProduct(productId) {
        return ProductModel.findByIdAndDelete(productId)
            .exec()
            .then(deletedProduct => {
                if (!deletedProduct) {
                    const error = new Error('Product not found')
                    error.status = 404
                    throw error
                }

                deletedProduct = deletedProduct.toObject()
                delete deletedProduct.owner
                return {
                    message: 'Product deleted successfully',
                    product: deletedProduct
                }
            })
    }
})();
