const express = require('express');
const router = express.Router();
const upload = require('../config/multer'); // Importa el middleware de multer configurado con Cloudinary
const {
  createUser,
  updateUser,
  updateUserRole,
  getAllUsers,
  getUserById,
  deleteUser,
} = require('../controllers/userController');

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:  # Cambiado a multipart/form-data para manejar archivos
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Juan
 *               lastName:
 *                 type: string
 *                 example: Perez
 *               email:
 *                 type: string
 *                 example: juan.perez@example.com
 *               phone:
 *                 type: string
 *                 example: 5551234567
 *               password:
 *                 type: string
 *                 example: 123456
 *               matricula:
 *                 type: string
 *                 example: A12345
 *               role:
 *                 type: string
 *                 example: Usuario
 *               gender:
 *                 type: string
 *                 example: Masculino
 *               image:
 *                 type: string
 *                 format: binary  # Especifica que es un archivo
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error de validación o usuario ya registrado
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', upload.single('image'), createUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario obtenido exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', getUserById);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualiza la imagen, el nombre y el apellido de un usuario
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data: # Asegúrate de que este tipo de contenido esté especificado
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Juan
 *               lastName:
 *                 type: string
 *                 example: Perez
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Imagen del usuario
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario actualizado exitosamente
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 673bf5082092e837eb18fb30
 *                     name:
 *                       type: string
 *                       example: Juan
 *                     lastName:
 *                       type: string
 *                       example: Perez
 *                     image:
 *                       type: string
 *                       example: https://example.com/user-image.jpg
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.put('/:id', upload.single('image'), updateUser);

/**
 * @swagger
 * /api/users/{id}/role:
 *   patch:
 *     summary: Actualiza el rol de un usuario
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario cuyo rol se va a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 example: Vendedor
 *     responses:
 *       200:
 *         description: Rol actualizado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       400:
 *         description: Rol no válido
 *       500:
 *         description: Error interno del servidor
 */
router.patch('/:id/role', updateUserRole);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Elimina un usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', deleteUser);

module.exports = router;
