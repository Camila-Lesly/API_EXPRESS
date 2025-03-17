(function () {
    'use strict';

    var express = require('express');
    var bcrypt = require('bcryptjs');
    var router = express.Router();
    var AuthMiddleware = require('./auth.module')().AuthMiddleware;
    var ProductService = require('../auth/producto.service');
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
    router.get('/product', async function (req, res, next) {
        try {
            const products = await ProductService.getAllProducts();
            res.status(200).json(products);
        } catch (err) {
            next(err);
        }
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
    router.get('/product/:id', async function (req, res, next) {
        const { id } = req.params;
        try {
            const product = await ProductService.getProductById(id);
            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            res.status(200).json(product);
        } catch (err) {
            next(err);
        }
    });

    /**
     * @swagger
     * /api/product:
     *   post:
     *     summary: Registra un nuevo usuario
     *     tags: [Auth]
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
    router.post('/product', AuthMiddleware.guardLogin, async function (req, res, next) {
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
     *     tags: [Auth]
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
        AuthMiddleware.updateUser,
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
    router.delete('/product/:id', async function (req, res, next) {
        const { id } = req.params;
        try {
            const product = await ProductService.getProductById(id);
            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            res.status(200).json(product);
        } catch (err) {
            next(err);
        }
    });


    module.exports = router;

})();
