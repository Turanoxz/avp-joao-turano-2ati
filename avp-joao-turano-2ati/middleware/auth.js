const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "chave-secreta-av2-animes";

function autenticar(req, res, next) {
  const cabecalho = req.headers.authorization;
  const [tipo, token] = cabecalho ? cabecalho.split(" ") : [];

  if (tipo !== "Bearer" || !token) {
    return res.status(401).json({ erro: "Token Bearer não informado." });
  }

  try {
    req.usuario = jwt.verify(token, JWT_SECRET);
    return next();
  } catch (error) {
    return res.status(401).json({ erro: "Token inválido ou expirado." });
  }
}

module.exports = {
  autenticar,
  JWT_SECRET
};
