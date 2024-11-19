const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinaryConfig');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'users', // Carpeta en tu cuenta de Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'], // Formatos permitidos
  },
});

const upload = multer({ storage });

module.exports = upload;
