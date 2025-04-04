(function () {
    'use strict';

    var express = require('express');
    var router = express.Router();
    var AuthMiddleware = require('../auth/auth.module')().AuthMiddleware;
    var ProductMiddleware = require('./product.module')().ProductMiddleware;
    var ProductService = require('./product.module')().ProductService;

    /**
     * @swagger
     * components:  
     *   securitySchemes:
     *     bearerAuth:
     *       type: http
     *       scheme: bearer
     *       bearerFormat: JWT
     *   schemas:
     *     Product:
     *       type: object
     *       properties:
     *         name:
     *           type: string
     *         price:
     *           type: number
     *         description:
     *           type: string
     */

    /**
     * @swagger
     * /api/product:
     *   get:
     *     summary: Obtiene todos los productos
     *     tags: [Products]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Lista de productos
     */
    router.get('/', AuthMiddleware.guardLogin,
        ProductMiddleware.getProducts,
        function (req, res) {
            res.status(200).json(req.response);
        });

    /**
     * @swagger
     * /api/product/{id}:
     *   get:
     *     summary: Obtiene un producto por su ID
     *     tags: [Products]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Detalles del producto
     *       404:
     *         description: Producto no encontrado
     */
    router.get('/:id', AuthMiddleware.guardLogin, 
        ProductMiddleware.validateUserOwnsProduct,
        ProductMiddleware.getProduct,
        function (req, res) {
            res.status(200).json(req.response);
        });

    /**
     * @swagger
     * /api/product:
     *   post:
     *     summary: Crea un nuevo producto
     *     tags: [Products]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Product'
     *     responses:
     *       201:
     *         description: Producto creado exitosamente
     *       400:
     *         description: Error en los datos del producto
     */
    router.post('/', AuthMiddleware.guardLogin, ProductMiddleware.validateProductData, async function (req, res, next) {
        try {
            req.body.owner = req.userId
            const product = await ProductService.createProduct(req.body);
            res.status(201).json(product);
        } catch (err) {
            next(err);
        }
    });

    /**
     * @swagger
     * /api/product/:id:
     *   patch:
     *     summary: Actualiza el perfil del usuario autenticado
     *     tags: [Products]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: productId
     *         required: true
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Product'
     *     responses:
     *       200:
     *         description: Producto actualizado correctamente
     *       401:
     *         description: No autorizado
     *       404:
     *         description: Producto no encontrado
     */
    router.patch('/:id',
        AuthMiddleware.guardLogin,
        ProductMiddleware.validateProductData,
        ProductMiddleware.validateUserOwnsProduct,
        ProductMiddleware.updateProduct,
        function (req, res) {
            res.status(200).json(req.response);
        });

    /**
     * @swagger
     * /api/product/{id}:
     *   delete:
     *     summary: Elimina un producto por su ID
     *     tags: [Products]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Producto eliminado exitosamente
     *       404:
     *         description: Producto no encontrado
     */
    router.delete('/:id', 
        AuthMiddleware.guardLogin, 
        ProductMiddleware.validateUserOwnsProduct,
        ProductMiddleware.deleteProduct, 
        function (req, res) {
            res.status(200).json(req.response);
        });

    module.exports = router;

})();