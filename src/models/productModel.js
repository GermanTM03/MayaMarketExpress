const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  image_1: { type: String, required: true },
  image_2: { type: String },
  image_3: { type: String },
  stock: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 0 },
  size: { type: String, required: true },
  status: {
    type: String,
    enum: ['available', 'unavailable', 'sold', 'pending'], // Se agrega 'pending'
    default: 'pending', // Por defecto será 'pending'
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
