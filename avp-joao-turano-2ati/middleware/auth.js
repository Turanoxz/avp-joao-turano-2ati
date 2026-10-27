import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/security.js";

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

export { autenticar, JWT_SECRET };
