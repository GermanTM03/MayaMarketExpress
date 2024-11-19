const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'El número de teléfono debe tener 10 dígitos'],
  },
  matricula: { type: String, unique: true, sparse: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['Usuario', 'Vendedor', 'Administrador'],
    default: 'Usuario',
  },
  gender: {
    type: String,
    enum: ['Masculino', 'Femenino', 'Otro'],
    required: true,
  },
  image: { type: String }, // URL de la imagen
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
