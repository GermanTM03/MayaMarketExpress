const paypal = require('@paypal/checkout-server-sdk'); // Importa el SDK de PayPal
const paypalClient = require('../config/paypalClient'); // Importa el cliente configurado

// Controlador para crear una orden
const createOrder = async (req, res) => {
  const { totalAmount } = req.body;

  // Validación de datos
  if (!totalAmount || isNaN(totalAmount) || parseFloat(totalAmount) <= 0) {
    return res.status(400).json({ message: 'El monto total debe ser un número válido y mayor a 0.' });
  }

  // Configurar la solicitud de creación de orden
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD', // Cambiar a la moneda necesaria
          value: totalAmount,
        },
      },
    ],
    application_context: {
      return_url: 'https://tu-dominio.com/success', // URL para éxito
      cancel_url: 'https://tu-dominio.com/cancel',  // URL para cancelación
      brand_name: 'Tu Marca', // Opcional: nombre de la marca que aparecerá en PayPal
      landing_page: 'LOGIN', // Opcional: muestra una página de inicio de sesión primero
    },
  });

  try {
    // Crear la orden con el cliente PayPal
    const order = await paypalClient.execute(request);

    // Extraer la URL de aprobación
    const approvalUrl = order.result.links.find((link) => link.rel === 'approve')?.href;

    if (!approvalUrl) {
      throw new Error('No se encontró la URL de aprobación en la respuesta de PayPal.');
    }

    // Responder con la URL de aprobación
    return res.status(201).json({ approvalUrl });
  } catch (error) {
    console.error('Error al crear la orden:', error.message);
    return res.status(500).json({ message: 'Hubo un error al procesar el pago. Inténtalo de nuevo más tarde.' });
  }
};

module.exports = { createOrder };
