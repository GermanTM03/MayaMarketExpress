const express = require('express');
const router = express.Router();
const { addToCart, 
    getCartByUserId, 
    removeFromCart, 
    completePayment ,
    clearCart ,
    updateProductQuantity  } = require('../controllers/cartController');

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Agrega un producto al carrito
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 64abc098xyz765fg432j
 *               productId:
 *                 type: string
 *                 example: 64abc123def456gh789i
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Producto agregado al carrito exitosamente
 *       400:
 *         description: Faltan campos requeridos
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', addToCart);

/**
 * @swagger
 * /api/cart/{userId}:
 *   get:
 *     summary: Obtiene el carrito de un usuario por ID
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Carrito obtenido exitosamente
 *       404:
 *         description: Carrito no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:userId', getCartByUserId);

/**
 * @swagger
 * /api/cart/remove:
 *   delete:
 *     summary: Elimina un producto del carrito
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 64abc098xyz765fg432j
 *               productId:
 *                 type: string
 *                 example: 64abc123def456gh789i
 *     responses:
 *       200:
 *         description: Producto eliminado del carrito exitosamente
 *       404:
 *         description: Producto o carrito no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/remove', removeFromCart);

/**
 * @swagger
 * /api/cart/update:
 *   patch:
 *     summary: Actualiza la cantidad de un producto en el carrito
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 64abc098xyz765fg432j
 *               productId:
 *                 type: string
 *                 example: 64abc123def456gh789i
 *               quantity:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Cantidad actualizada exitosamente
 *       404:
 *         description: Producto o carrito no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.patch('/update', updateProductQuantity);



/**
 * @swagger
 * /api/cart/clear:
 *   delete:
 *     summary: Vacía el carrito de un usuario
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 64abc098xyz765fg432j
 *     responses:
 *       200:
 *         description: Carrito vaciado exitosamente
 *       404:
 *         description: Carrito no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/clear', clearCart);

/**
 * @swagger
 * /api/cart/checkout:
 *   post:
 *     summary: Completa el pago y actualiza el stock de los productos
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 64abc098xyz765fg432j
 *     responses:
 *       200:
 *         description: Pago completado y carrito vaciado exitosamente
 *       400:
 *         description: Stock insuficiente o datos inválidos
 *       404:
 *         description: Carrito o producto no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.post('/checkout', completePayment);



module.exports = router;
