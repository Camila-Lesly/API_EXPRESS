(function () {
    'use strict'

    module.exports = {
        validateProductData: validateProductData,
        validateUserOwnsProduct: validateUserOwnsProduct,
        updateProduct: updateProduct,
        getProduct: getProduct,
        getProducts: getProducts,
        deleteProduct: deleteProduct,
    };

    var ProductService = require('./product.module')().ProductService;

    function validateProductData(req, res, next) {
        const { name, description, price } = req.body;
        if (!name || !description || !price) {
            return res.status(400).json({ message: 'The name, description, and price fields are required.' });
        }

        next();
    }

    function validateUserOwnsProduct(req, res, next) {
        const userId = req.userId;
        const productId = req.params.id;
        ProductService.getProduct(productId)
            .then(product => {
                if (!product) {
                    return res.status(404).json({ message: 'Product not found.' });
                }

                if (product.owner != userId) {
                    return res.status(403).json({ message: 'You do not have permission to access this product.' });
                }

                next();
            })
            .catch(err => {
                next(err);
            });
    }

    async function updateProduct(req, res, next) {
        try {
            req.body.owner = req.userId
            const data = await ProductService.updateProduct(req.params.id, req.body)
            req.response = data
            next()
        } catch (err) {
            err.status = err.status || 500
            next(err)
        }
    }

    async function getProduct(req, res, next) {
        try {
            const data = await ProductService.getProduct(req.params.id)
            req.response = data
            next()
        } catch (err) {
            err.status = err.status || 500
            next(err)
        }
    }

    async function deleteProduct(req, res, next) {
        try {
            const data = await ProductService.deleteProduct(req.params.id)
            req.response = data
            next()
        } catch (err) {
            err.status = err.status || 500
            next(err)
        }
    }

    function getProducts(req, res, next) {
        ProductService.getProducts(req.userId)
            .then(products => {
                res.status(200).json(products);
            })
            .catch(err => {
                next(err);
            });
    }

})();
