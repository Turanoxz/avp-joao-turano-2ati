export function responderUploadImagem(req, res) {
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
}