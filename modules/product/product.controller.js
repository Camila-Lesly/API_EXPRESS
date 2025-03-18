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
     */

    /**
     * @swagger
     * /api/product:
     *   get:
     *     summary: Obtiene todos los productos
     *     tags: [Products]
     *     responses:
     *       200:
     *         description: Lista de productos
     */
    router.get('/product', AuthMiddleware.guardLogin,
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
    router.get('/product/:id', AuthMiddleware.guardLogin, 
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
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Register'
     *     responses:
     *       201:
     *         description: Usuario registrado exitosamente
     *       400:
     *         description: Error en los datos de registro
     */
    router.post('/product', AuthMiddleware.guardLogin, ProductMiddleware.validateProductData, async function (req, res, next) {
        try {
            const user = await ProductService.re(req.body);
            res.status(201).json({ message: 'Usuario registrado exitosamente', user });
        } catch (err) {
            next(err);
        }
    });

    /**
     * @swagger
     * /api/product/:productId:
     *   patch:
     *     summary: Actualiza el perfil del usuario autenticado
     *     tags: [Products]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Register'
     *     responses:
     *       200:
     *         description: Perfil actualizado correctamente
     *       401:
     *         description: No autorizado
     */
    router.patch('/product/:productId',
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
     *     summary: Obtiene un producto por su ID
     *     tags: [Products]
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
    router.delete('/product/:id', 
        AuthMiddleware.guardLogin, 
        ProductMiddleware.validateUserOwnsProduct,
        ProductMiddleware.deleteProduct, 
        function (req, res) {
            res.status(200).json(req.response);
        });


    module.exports = router;

})();