const express = require('express');
const router = express.Router();
const upload = require('../config/multer'); // Middleware de multer para Cloudinary
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  markAsSold,
  markAsPending, // Nueva función
  deleteProduct,
} = require('../controllers/productController');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Gestión de productos
 */

/**
/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crea un nuevo producto con imágenes
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID del usuario que sube el producto
 *                 example: 64abc098xyz765fg432j
 *               name:
 *                 type: string
 *                 description: Nombre del producto
 *                 example: Mi Producto
 *               image_1:
 *                 type: string
 *                 format: binary
 *                 description: Primera imagen del producto
 *               image_2:
 *                 type: string
 *                 format: binary
 *                 description: Segunda imagen del producto
 *               image_3:
 *                 type: string
 *                 format: binary
 *                 description: Tercera imagen del producto
 *               stock:
 *                 type: integer
 *                 description: Cantidad disponible del producto
 *                 example: 10
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Precio del producto
 *                 example: 100.5
 *               quantity:
 *                 type: integer
 *                 description: Número de unidades por paquete
 *                 example: 1
 *               size:
 *                 type: string
 *                 description: Tamaño del producto
 *                 example: L
 *               status:
 *                 type: string
 *                 description: Estado del producto
 *                 example: available
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Producto creado exitosamente
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Error de validación o campos requeridos faltantes
 *       500:
 *         description: Error interno del servidor
 */

router.post(
  '/',
  upload.fields([
    { name: 'image_1', maxCount: 1 },
    { name: 'image_2', maxCount: 1 },
    { name: 'image_3', maxCount: 1 },
  ]),
  createProduct
);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtiene todos los productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Error interno del servidor
 */

router.get('/', getAllProducts);


/**
 * @swagger
 * /api/products/user/{userId}:
 *   get:
 *     summary: Obtiene productos por ID de usuario
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Productos obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: No se encontraron productos
 *       500:
 *         description: Error interno del servidor
 */
router.get('/user/:userId', getProductsByUserId);


/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtiene un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', getProductById);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Actualiza un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', updateProduct);

/**
 * @swagger
 * /api/products/{id}/sold:
 *   patch:
 *     summary: Marca un producto como vendido
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: sold
 *     responses:
 *       200:
 *         description: Producto marcado como vendido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.patch('/:id/sold', markAsSold);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Elimina un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', deleteProduct);

/**
 * @swagger
 * /api/products/{id}/pending:
 *   patch:
 *     summary: Marca un producto como pendiente
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto marcado como pendiente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 *       400:
 *         description: ID inválido
 *       500:
 *         description: Error interno del servidor
 */
router.patch('/:id/pending', markAsPending);

module.exports = router;
