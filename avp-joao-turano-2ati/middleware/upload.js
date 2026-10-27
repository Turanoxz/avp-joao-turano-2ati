import multer from "multer";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pastaUploads = path.join(__dirname, "..", "uploads");
fs.mkdirSync(pastaUploads, { recursive: true });

const extensoesPermitidas = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp"]);
const tiposPermitidos = new Set(["image/jpeg", "image/png", "image/gif", "image/webp"]);

const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, pastaUploads),
  filename: (req, file, callback) => {
    const extensao = path.extname(file.originalname).toLowerCase();
    callback(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${extensao}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, callback) => {
    const extensao = path.extname(file.originalname).toLowerCase();
    if (!tiposPermitidos.has(file.mimetype) || !extensoesPermitidas.has(extensao)) {
      const error = new Error("Apenas imagens JPG, JPEG, PNG, GIF ou WEBP são permitidas.");
      error.status = 400;
      return callback(error);
    }
    return callback(null, true);
  }
});

export const uploadImagem = upload.single("imagem");