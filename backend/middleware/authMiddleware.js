const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];  // Revisa que esté en minúsculas y no en mayúsculas

  if (!token) {
    return res.status(401).json({ error: "No autorizado" });
  }

  try {
    const tokenCleaned = token.split(" ")[1];  // Remueve el 'Bearer' para obtener solo el token
    const decoded = jwt.verify(tokenCleaned, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Token inválido" });
  }
};

module.exports = authMiddleware;
