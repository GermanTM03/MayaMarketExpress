const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  getOrdersByUserId,
  updateOrderStatus,
  markAsPedido,
  markAsAlmacenado,
  deleteOrder,
  getOrderById,
  getOrdersByProductUserId,
  markAsCompletado,
} = require('../controllers/orderController');

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Gestión de pedidos
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Obtiene todos los pedidos con estado pendiente o almacenado
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Lista de pedidos obtenida exitosamente
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', getAllOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Obtiene un pedido por su ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del pedido
 *     responses:
 *       200:
 *         description: Pedido obtenido exitosamente
 *       404:
 *         description: Pedido no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', getOrderById);

/**
 * @swagger
 * /api/orders/product/{userId}:
 *   get:
 *     summary: Obtiene los pedidos asociados a un usuario basado en el producto
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario asociado al producto
 *     responses:
 *       200:
 *         description: Pedidos obtenidos exitosamente
 *       404:
 *         description: No se encontraron pedidos para este usuario basado en el producto
 *       500:
 *         description: Error interno del servidor
 */
router.get('/product/:userId', getOrdersByProductUserId);


/**
 * @swagger
 * /api/orders/user/{userId}:
 *   get:
 *     summary: Obtiene los pedidos por ID de usuario
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Pedidos obtenidos exitosamente
 *       404:
 *         description: No se encontraron pedidos para este usuario
 *       500:
 *         description: Error interno del servidor
 */
router.get('/user/:userId', getOrdersByUserId);



/**
 * @swagger
 * /api/orders/{id}/pedido:
 *   patch:
 *     summary: Marca un pedido como "pedido"
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del pedido
 *     responses:
 *       200:
 *         description: Pedido actualizado a "pedido"
 *       404:
 *         description: Pedido no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.patch('/:id/pedido', markAsPedido);


/**
 * @swagger
 * /api/orders/{id}/almacenado:
 *   patch:
 *     summary: Marca un pedido como "almacenado"
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del pedido
 *     responses:
 *       200:
 *         description: Pedido actualizado a "almacenado"
 *       404:
 *         description: Pedido no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.patch('/:id/almacenado', markAsAlmacenado);

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Elimina un pedido por su ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del pedido
 *     responses:
 *       200:
 *         description: Pedido eliminado exitosamente
 *       404:
 *         description: Pedido no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', deleteOrder);

/**
 * @swagger
 * /api/orders/{id}/completado:
 *   patch:
 *     summary: Marca un pedido como "completado"
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del pedido
 *     responses:
 *       200:
 *         description: Pedido actualizado a "completado"
 *       404:
 *         description: Pedido no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.patch('/:id/completado', markAsCompletado);

/**
 * @swagger
 * /api/orders/{id}:
 *   patch:
 *     summary: Actualiza el estado de un pedido
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: completado
 *     responses:
 *       200:
 *         description: Estado del pedido actualizado exitosamente
 *       400:
 *         description: Estado no válido
 *       404:
 *         description: Pedido no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.patch('/:id', updateOrderStatus);

module.exports = router;
