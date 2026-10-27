export function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  if (error.status === 400 || error.type === "entity.parse.failed") {
    return res.status(400).json({ erro: "JSON inválido na requisição." });
  }

  if (error.status === 413) {
    return res.status(413).json({ erro: "O corpo da requisição é muito grande." });
  }

  if (error.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({ erro: "A imagem deve ter no máximo 5 MB." });
  }

  if (error.status === 400) {
    return res.status(400).json({ erro: error.message });
  }

  console.error(error);
  return res.status(500).json({ erro: "Erro interno do servidor." });
}
