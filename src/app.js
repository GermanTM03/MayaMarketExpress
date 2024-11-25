const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes'); 
const swaggerUsers = require('./Swaggers/swaggerUsers'); 
const swaggerProducts = require('./Swaggers/swaggerProducts'); 
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: '*', // Permitir cualquier origen
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'], // Remueve 'Authorization' si usas '*'
};
app.use(cors(corsOptions));

  
  app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Documentación Swagger
swaggerUsers(app); // Documentación para usuarios
swaggerProducts(app); // Documentación para productos

// Conectar a la base de datos
connectDB();

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
