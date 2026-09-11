const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();
const pastaUploads = path.join(__dirname, "..", "uploads");

fs.mkdirSync(pastaUploads, { recursive: true });

const extensoesPermitidas = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp"]);
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
    const tiposPermitidos = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    if (!tiposPermitidos.includes(file.mimetype) || !extensoesPermitidas.has(extensao)) {
      return callback(new Error("Apenas imagens JPG, JPEG, PNG, GIF ou WEBP são permitidas."));
    }

    return callback(null, true);
  }
});

router.post("/", (req, res) => {
  upload.single("imagem")(req, res, (error) => {
    if (error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({ erro: "A imagem deve ter no máximo 5 MB." });
    }

    if (error) {
      return res.status(400).json({ erro: error.message });
    }

    if (!req.file) {
      return res.status(400).json({ erro: "Envie uma imagem no campo 'imagem'." });
    }

    return res.status(201).json({
      mensagem: "Imagem enviada com sucesso!",
      arquivo: {
        nome: req.file.filename,
        caminho: `/uploads/${req.file.filename}`,
        tamanho: req.file.size,
        tipo: req.file.mimetype
      }
    });
  });
});

module.exports = router;
