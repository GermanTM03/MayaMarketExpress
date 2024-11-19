const express = require('express');
const { loginUser } = require('../controllers/authController');

const router = express.Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Inicia sesión con email y contraseña
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 64bc12345abcde6789
 *                 name:
 *                   type: string
 *                   example: John Doe
 *       404:
 *         description: Usuario no encontrado
 *       401:
 *         description: Contraseña incorrecta
 *       400:
 *         description: Campos requeridos faltantes
 */
router.post('/login', loginUser);

module.exports = router;
