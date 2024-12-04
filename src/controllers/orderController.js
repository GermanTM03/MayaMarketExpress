const Almacen = require('../models/almacenModel');

// Obtener todos los pedidos
// Obtener todos los pedidos con estado "pendiente" o "almacenado"
const getAllOrders = async (req, res) => {
    try {
      const orders = await Almacen.find({ status: { $in: ['pendiente', 'almacenado'] } })
        .populate('userId', 'name email') // Poblar datos de usuario
        .populate('productId', 'userId name price'); // Poblar datos de producto
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los pedidos', error: error.message });
    }
  };
  
  const getOrdersByProductUserId = async (req, res) => {
    const { userId } = req.params;
  
    try {
      // Obtener todos los pedidos con los datos poblados
      const orders = await Almacen.find()
        .populate('userId', 'name email') // Poblar datos de usuario
        .populate('productId', 'userId name price'); // Poblar datos de producto
  
      // Filtrar en memoria
      const filteredOrders = orders.filter(order => order.productId.userId == userId);
  
      if (filteredOrders.length === 0) {
        return res.status(404).json({ message: 'No se encontraron pedidos para este userId de producto' });
      }
  
      res.status(200).json(filteredOrders);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los pedidos', error: error.message });
    }
  };
  
  
  // Obtener pedidos por ID de usuario
  const getOrdersByUserId = async (req, res) => {
    const { userId } = req.params;
    
    try {
      const orders = await Almacen.find({ userId })
      .populate('productId', 'userId name price') // Poblar datos de producto
      .populate('userId', 'name email'); // Poblar datos de usuario
      if (!orders || orders.length === 0) {
        return res.status(404).json({ message: 'No se encontraron pedidos para este usuario' });
      }
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los pedidos del usuario', error: error.message });
    }
  };


  // Obtener un pedido por su ID
const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Almacen.findById(id)
      .populate('userId', 'name email') // Poblar datos de usuario
      .populate('productId', 'userId name price'); // Poblar datos de producto

    if (!order) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el pedido', error: error.message });
  }
};

// Modificar el estado de un pedido
const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || !['pendiente', 'completado', 'almacenado'].includes(status)) {
    return res.status(400).json({ message: 'Estado no válido' });
  }

  try {
    const order = await Almacen.findById(id);

    if (!order) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message: 'Estado del pedido actualizado', order });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el estado del pedido', error: error.message });
  }
};

// Modificar el estado a "pedido"
const markAsPedido = async (req, res) => {
    const { id } = req.params;
  
    try {
      const order = await Almacen.findById(id);
      if (!order) {
        return res.status(404).json({ message: 'Pedido no encontrado' });
      }
  
      order.status = 'pendiente';
      await order.save();
  
      res.status(200).json({ message: 'Estado del pedido actualizado a "pedido"', order });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el estado del pedido', error: error.message });
    }
  };
  
  // Modificar el estado a "almacenado"
  const markAsAlmacenado = async (req, res) => {
    const { id } = req.params;
  
    try {
      const order = await Almacen.findById(id);
      if (!order) {
        return res.status(404).json({ message: 'Pedido no encontrado' });
      }
  
      order.status = 'almacenado';
      await order.save();
  
      res.status(200).json({ message: 'Estado del pedido actualizado a "almacenado"', order });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el estado del pedido', error: error.message });
    }
  };
  
  // Modificar el estado a "completado"
  const markAsCompletado = async (req, res) => {
    const { id } = req.params;
  
    try {
      const order = await Almacen.findById(id);
      if (!order) {
        return res.status(404).json({ message: 'Pedido no encontrado' });
      }
  
      order.status = 'completado';
      await order.save();
  
      res.status(200).json({ message: 'Estado del pedido actualizado a "completado"', order });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el estado del pedido', error: error.message });
    }
  };



// Eliminar un pedido del Almacen
const deleteOrder = async (req, res) => {
    const { id } = req.params;
  
    try {
      const order = await Almacen.findByIdAndDelete(id);
  
      if (!order) {
        return res.status(404).json({ message: 'Pedido no encontrado' });
      }
  
      res.status(200).json({ message: 'Pedido eliminado exitosamente', order });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el pedido', error: error.message });
    }
  };
  
module.exports = {
  getAllOrders,
  getOrdersByUserId,
  updateOrderStatus,
  markAsPedido,
  markAsAlmacenado,
  deleteOrder,
  markAsCompletado,
  getOrderById,
  getOrdersByProductUserId

};
