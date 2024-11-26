const paypal = require('@paypal/checkout-server-sdk');

// Configura el entorno
const environment = new paypal.core.SandboxEnvironment(
  'AfodBDxLuXG7Z8tL5Lk17p7gmaTyw7MgmRdAdx8GIABcpN1rIakvXdM1xbi_RVvM5t9zACVeiWjuCtRO',
  'EMIh1LSnM7EBJzeE-GG59a8npFFe1bKlUc8kbGLjl4Kbbc5XL5CY1vFM0RCjtomnp4ti6R2x44GEtr58'
);
const client = new paypal.core.PayPalHttpClient(environment);

module.exports = client;
