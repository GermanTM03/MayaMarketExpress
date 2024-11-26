const express = require('express');
const { createOrder } = require('../controllers/paypalController');
const router = express.Router();

// Ruta para crear una orden en PayPal
router.post('/create-order', createOrder);

module.exports = router;
