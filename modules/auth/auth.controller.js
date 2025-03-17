(function () {
    'use strict';

    var express = require('express');
    var bcrypt = require('bcryptjs');
    var router = express.Router();
    var AuthMiddleware = require('./auth.module')().AuthMiddleware;
    var AuthService = require('./auth.module')().AuthService;

    /**
     * @swagger
     * components:  
     *   securitySchemes:
     *     bearerAuth:
     *       type: http
     *       scheme: bearer
     *       bearerFormat: JWT
     *   schemas:
     *     Register:
     *       type: object
     *       required:
     *         - firstName
     *         - lastName
     *         - email
     *         - password
     *         - confirmPassword
     *       properties:
     *         firstName:
     *           type: string
     *         lastName:
     *           type: string
     *         email:
     *           type: string
     *         password:
     *           type: string
     *         confirmPassword:
     *           type: string
     */

    /**
     * @swagger
     * /api/auth/register:
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
    router.post('/register', AuthMiddleware.validateRegisterData, async function (req, res, next) {
        try {
            const user = await AuthService.registerUser(req.body);
            res.status(201).json({ message: 'Usuario registrado exitosamente', user });
        } catch (err) {
            next(err);
        }
    });

    /**
     * @swagger
     * /api/auth/profile:
     *   get:
     *     summary: Obtiene los datos del usuario autenticado
     *     tags: [Auth]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Datos del usuario autenticado
     *       401:
     *         description: No autorizado
     */
    router.get('/profile', 
        AuthMiddleware.guardLogin,
        AuthMiddleware.getUser,
        function (req, res) {
            res.status(200).json(req.user);
        });

    /**
     * @swagger
     * /api/auth/profile:
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
    router.patch('/profile',
        AuthMiddleware.guardLogin,
        AuthMiddleware.updateUser,
        function (req, res) {
            res.status(200).json(req.response);
        });

    /**
     * @swagger
     * /api/auth/login:
     *   post:
     *     summary: Inicia sesión en la aplicación
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       200:
     *         description: Inicio de sesión exitoso
     *       401:
     *         description: Credenciales inválidas
     */
    router.post('/login',
        AuthMiddleware.loginUser,
        function (req, res) {
            res.status(200).json(req.response);
        });
    
    /**
     * @swagger
     * /api/auth/profile:
     *   delete:
     *     summary: Elimina el perfil del usuario autenticado
     *     tags: [Auth]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Perfil eliminado correctamente
     *       401:
     *         description: No autorizado
     */
    router.delete('/profile',
        AuthMiddleware.guardLogin,
        AuthMiddleware.deleteProfile,
        function (req, res) {
            res.status(200).json(req.response);
        });

    module.exports = router;

})();
