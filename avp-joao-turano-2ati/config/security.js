import "./env.js";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET || JWT_SECRET.length < 32) {
  throw new Error("JWT_SECRET deve estar definido no .env e conter pelo menos 32 caracteres.");
}

export { JWT_SECRET };