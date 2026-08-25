const express = require("express");
const router = express.Router();
const { animes, getProximoId } = require("../data/animes");

// POST /animes -> cadastra um novo anime
router.post("/", (req, res) => {
  const { titulo, genero, temporadas, episodios, status, nota, sinopse } = req.body;

  if (!titulo || !genero) {
    return res.status(400).json({
      erro: "Os campos 'titulo' e 'genero' são obrigatórios."
    });
  }

  const novoAnime = {
    id: getProximoId(),
    titulo,
    genero,
    temporadas: temporadas || 0,
    episodios: episodios || 0,
    status: status || "planejo assistir",
    nota: nota || null,
    sinopse: sinopse || ""
  };

  animes.push(novoAnime);

  return res.status(201).json({
    mensagem: "Anime cadastrado com sucesso!",
    anime: novoAnime
  });
});

// GET /animes -> lista todos os animes
router.get("/", (req, res) => {
  return res.status(200).json(animes);
});

// GET /animes/:id -> consulta um anime específico
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const anime = animes.find((item) => item.id === id);

  if (!anime) {
    return res.status(404).json({ erro: "Anime não encontrado." });
  }

  return res.status(200).json(anime);
});

// PUT /animes/:id -> edita um anime existente
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const anime = animes.find((item) => item.id === id);

  if (!anime) {
    return res.status(404).json({ erro: "Anime não encontrado." });
  }

  const { titulo, genero, temporadas, episodios, status, nota, sinopse } = req.body;

  if (titulo !== undefined) anime.titulo = titulo;
  if (genero !== undefined) anime.genero = genero;
  if (temporadas !== undefined) anime.temporadas = temporadas;
  if (episodios !== undefined) anime.episodios = episodios;
  if (status !== undefined) anime.status = status;
  if (nota !== undefined) anime.nota = nota;
  if (sinopse !== undefined) anime.sinopse = sinopse;

  return res.status(200).json({
    mensagem: "Anime atualizado com sucesso!",
    anime
  });
});

// DELETE /animes/:id -> remove um anime
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = animes.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: "Anime não encontrado." });
  }

  const [animeRemovido] = animes.splice(index, 1);

  return res.status(200).json({
    mensagem: "Anime removido com sucesso!",
    anime: animeRemovido
  });
});

module.exports = router;
