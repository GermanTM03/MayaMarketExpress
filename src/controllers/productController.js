const mongoose = require('mongoose');
const Product = require('../models/productModel');

// Crear un producto
const createProduct = async (req, res) => {
  const { userId,name,categories , stock, price, quantity, size, status } = req.body;
  console.log("product")

  if (!userId || !name || !categories || !stock || !price || !quantity || !size || !req.files) {
    return res.status(400).json({ message: 'Faltan campos requeridos o imágenes.' });
  }

  try {
    const image_1 = req.files.image_1 ? req.files.image_1[0].path : null;
    const image_2 = req.files.image_2 ? req.files.image_2[0].path : null;
    const image_3 = req.files.image_3 ? req.files.image_3[0].path : null;

    const product = await Product.create({
      userId,
      name,
      categories,
      image_1,
      image_2,
      image_3,
      stock,
      price,
      quantity,
      size,
      status: status || 'available', // Por defecto 'available'
    });

    res.status(201).json({
      message: 'Producto creado exitosamente',
      product,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el producto', error: error.message });
  }
};

// Obtener todos los productos
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
  }
};
// Obtener productos por ID de usuario
const getProductsByUserId = async (req, res) => {
  const { userId } = req.params;

  // Validar el formato del ID
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'ID de usuario inválido.' });
  }

  try {
    const products = await Product.find({ userId });
    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No se encontraron productos para este usuario.' });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos del usuario', error: error.message });
  }
};

// Obtener un producto por ID
const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
  }
};

// Actualizar un producto
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    Object.assign(product, updates); // Actualiza los campos enviados
    const updatedProduct = await product.save();

    res.status(200).json({
      message: 'Producto actualizado exitosamente',
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
  }
};

// Eliminar un producto
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
  }
};

// Marcar un producto como vendido
const markAsSold = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Validar que el estado sea "sold"
  if (status !== 'sold') {
    return res.status(400).json({ message: 'El estado debe ser "sold".' });
  }

  // Validar el formato del ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID de producto inválido.' });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }

    product.status = 'sold';
    const updatedProduct = await product.save();

    res.status(200).json({
      message: 'Producto marcado como vendido.',
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
  }
};


const updateProductQuantity = async (req, res) => {
  const { id } = req.params; // ID del producto
  const { quantity } = req.body; // Nueva cantidad

  // Validar el ID y la cantidad
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID de producto inválido.' });
  }

  if (quantity == null || quantity < 0) {
    return res.status(400).json({ message: 'La cantidad es requerida y debe ser mayor o igual a 0.' });
  }

  try {
    // Actualizar la cantidad directamente
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { quantity }, // Campo a actualizar
      { new: true, runValidators: true } // Retorna el producto actualizado y ejecuta validaciones solo en el campo modificado
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }

    res.status(200).json({
      message: 'Cantidad actualizada exitosamente.',
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al actualizar la cantidad del producto.',
      error: error.message,
    });
  }
};



const markAsPending = async (req, res) => {
    const { id } = req.params;
  
    // Validar el formato del ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de producto inválido.' });
    }
  
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado.' });
      }
  
      product.status = 'pending';
      const updatedProduct = await product.save();
  
      res.status(200).json({
        message: 'Producto marcado como pendiente.',
        product: updatedProduct,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
    }
  };
  

module.exports = {
  createProduct,
  markAsSold,
  markAsPending, // Nueva función
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByUserId, // Exporta la nueva función
  updateProductQuantity,
};
