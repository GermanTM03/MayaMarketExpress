const paypal = require('@paypal/checkout-server-sdk'); // Importa el SDK de PayPal
const paypalClient = require('../config/paypalClient'); // Importa el cliente configurado

const createOrder = async (req, res) => {
  const { totalAmount } = req.body;

  if (!totalAmount) {
    return res.status(400).json({ message: 'El monto total es obligatorio.' });
  }

  // Configurar la solicitud de creación de orden
  const request = new paypal.orders.OrdersCreateRequest(); // Aquí estaba el error
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: totalAmount,
        },
      },
    ],
  });

  try {
    // Crear la orden
    const order = await paypalClient.execute(request);

    // Devolver la URL de aprobación
    const approvalUrl = order.result.links.find((link) => link.rel === 'approve').href;

    return res.status(201).json({ approvalUrl });
  } catch (error) {
    console.error('Error al crear la orden:', error);
    return res.status(500).json({ message: 'Hubo un error al procesar el pago.' });
  }
};

module.exports = { createOrder };
