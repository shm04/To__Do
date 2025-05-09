const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Definición del esquema de usuario
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Middleware para hashear la contraseña antes de guardar
userSchema.pre('save', async function (next) {
  // Verificar si la contraseña ha sido modificada
  if (!this.isModified('password')) return next();

  try {
    // Generar el hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Error al comparar contraseñas');
  }
};

// Exportar el modelo de usuario
module.exports = mongoose.model('User', userSchema);
