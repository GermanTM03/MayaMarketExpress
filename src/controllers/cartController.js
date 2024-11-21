const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

// Agregar al carrito
const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || !quantity) {
    return res.status(400).json({ message: 'Faltan campos requeridos' });
  }

  try {
    // Verificar si el producto existe
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Buscar el carrito del usuario
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Crear un carrito si no existe
      cart = new Cart({
        userId,
        items: [{ productId, quantity }],
      });
    } else {
      // Verificar si el producto ya está en el carrito
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

      if (itemIndex > -1) {
        // Actualizar la cantidad del producto
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Agregar el nuevo producto al carrito
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json({ message: 'Producto agregado al carrito', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar al carrito', error: error.message });
  }
};

// Obtener el carrito por ID de usuario
const getCartByUserId = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const cart = await Cart.findOne({ userId }).populate('items.productId');
      if (!cart) {
        return res.status(404).json({ message: 'Carrito no encontrado' });
      }
  
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el carrito', error: error.message });
    }
  };
  
// Eliminar un producto del carrito
const removeFromCart = async (req, res) => {
    const { userId, productId } = req.body;
  
    if (!userId || !productId) {
      return res.status(400).json({ message: 'Faltan campos requeridos' });
    }
  
    try {
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ message: 'Carrito no encontrado' });
      }
  
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
  
      if (itemIndex > -1) {
        // Eliminar el producto del carrito
        cart.items.splice(itemIndex, 1);
        await cart.save();
        return res.status(200).json({ message: 'Producto eliminado del carrito', cart });
      } else {
        return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el producto del carrito', error: error.message });
    }
  };
  // Actualizar la cantidad de un producto en el carrito
  const updateProductQuantity = async (req, res) => {
    const { userId, productId, quantity } = req.body;
  
    if (!userId || !productId || quantity == null) {
      return res.status(400).json({ message: 'Faltan campos requeridos' });
    }
  
    try {
      // Buscar el carrito del usuario
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ message: 'Carrito no encontrado' });
      }
  
      // Verificar si el producto existe en el carrito
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
      if (itemIndex === -1) {
        return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
      }
  
      // Verificar el stock del producto
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
  
      if (quantity > product.stock) {
        return res.status(400).json({
          message: `La cantidad solicitada (${quantity}) excede el stock disponible (${product.stock}).`,
        });
      }
  
      // Actualizar la cantidad en el carrito
      if (quantity <= 0) {
        // Si la cantidad es 0 o menor, eliminar el producto del carrito
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }
  
      await cart.save();
      res.status(200).json({ message: 'Cantidad actualizada', cart });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar la cantidad del producto', error: error.message });
    }
  };
  
  

module.exports = {
  addToCart,
    getCartByUserId,
    removeFromCart,
    updateProductQuantity,
};
