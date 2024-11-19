const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes'); // Importar rutas de productos
const swaggerSetup = require('./swagger');
const authRoutes = require('./routes/authRoutes'); // Importar rutas de autenticación

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Manejar formularios

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes); // Registrar las rutas de productos
app.use('/api/auth', authRoutes);

// Documentación Swagger
swaggerSetup(app);

// Conectar a la base de datos
connectDB();

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
