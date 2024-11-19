const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, lastName, phone, gender } = req.body;
  
    try {
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Actualizar los campos permitidos
      user.name = name || user.name;
      user.lastName = lastName || user.lastName;
      user.phone = phone || user.phone;
      user.gender = gender || user.gender;
  
      const updatedUser = await user.save();
      res.status(200).json({
        message: 'Usuario actualizado exitosamente',
        user: updatedUser,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message });
    }
  };

  
  const updateUserRole = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
  
    if (!['Usuario', 'Vendedor', 'Administrador'].includes(role)) {
      return res.status(400).json({ message: 'Rol no válido' });
    }
  
    try {
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      user.role = role;
      const updatedUser = await user.save();
  
      res.status(200).json({
        message: 'Rol actualizado exitosamente',
        user: updatedUser,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el rol', error: error.message });
    }
  };

  const getAllUsers = async (req, res) => {
    try {
      const users = await User.find({}, '-password'); // Excluye el campo password
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
    }
  };
  
  const getUserById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await User.findById(id, '-password'); // Excluye el campo password
  
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el usuario', error: error.message });
    }
  };
  
  const deleteUser = async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await User.findByIdAndDelete(id);
  
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
    }
  };
  

  const createUser = async (req, res) => {
    const { name, lastName, email, phone, password, matricula, role = 'Usuario', gender } = req.body;
  
    if (!name || !lastName || !email || !phone || !password || !gender) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios, excepto matrícula.' });
    }
  
    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'El correo ya está registrado' });
      }
  
      if (matricula) {
        const matriculaExists = await User.findOne({ matricula });
        if (matriculaExists) {
          return res.status(400).json({ message: 'La matrícula ya está registrada' });
        }
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const image = req.file ? req.file.path : null;
  
      const user = await User.create({
        name,
        lastName,
        email,
        phone,
        matricula,
        password: hashedPassword,
        role,
        gender,
        image,
      });
  
      res.status(201).json({
        message: 'Usuario creado exitosamente',
        user: {
          id: user.id,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          matricula: user.matricula,
          role: user.role,
          gender: user.gender,
          image: user.image,
        },
      });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
    }
  };
module.exports = {
  createUser,
  updateUser,
  updateUserRole,
  getAllUsers,
  getUserById,
  deleteUser,
};
