const mongoose = require('mongoose');

const almacenSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    status: { type: String, enum: ['pendiente', 'almacenado', 'completado'], default: 'pendiente' }, // Estado inicial
  },
  { timestamps: true }
);

module.exports = mongoose.model('Almacen', almacenSchema);
