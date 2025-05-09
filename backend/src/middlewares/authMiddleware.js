const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res
          .status(401)
          .json({ message: "Usuario no autorizado, usuario no encontrado" });
      }
      next();
    } catch (error) {
      console.error("Error en el middleware de autenticación:", error.message);
      res.status(401).json({ message: "No autorizado, token no válido" });
    }
  }

  if (!token) {
    console.error("No se proporcionó un token");
    return res.status(401).json({ message: "No autorizado, falta token" });
  }
};

module.exports = { protect };
