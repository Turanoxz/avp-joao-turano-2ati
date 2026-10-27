import * as animeModel from "../models/animeModel.js";
import { converterIdAnime, validarAnime } from "../utils/validacoes.js";

export async function criarAnime(req, res, next) {
  const validacao = validarAnime(req.body);
  if (validacao.erro) return res.status(400).json({ erro: validacao.erro });

  try {
    const anime = await animeModel.criar(validacao.data);
    return res.status(201).json({ mensagem: "Anime cadastrado com sucesso!", anime });
  } catch (error) {
    return next(error);
  }
}

export async function listarAnimes(req, res, next) {
  try {
    const animes = await animeModel.listarTodos();
    return res.status(200).json(animes);
  } catch (error) {
    return next(error);
  }
}

export async function listarAnimePorId(req, res, next) {
  const id = converterIdAnime(req.params.id);
  if (id === null) return res.status(400).json({ erro: "ID inválido." });

  try {
    const anime = await animeModel.buscarPorId(id);
    if (!anime) return res.status(404).json({ erro: "Anime não encontrado." });
    return res.status(200).json(anime);
  } catch (error) {
    return next(error);
  }
}

export async function atualizarAnime(req, res, next) {
  const id = converterIdAnime(req.params.id);
  if (id === null) return res.status(400).json({ erro: "ID inválido." });

  const validacao = validarAnime(req.body, true);
  if (validacao.erro) return res.status(400).json({ erro: validacao.erro });

  try {
    const anime = await animeModel.atualizar(id, validacao.data);
    return res.status(200).json({ mensagem: "Anime atualizado com sucesso!", anime });
  } catch (error) {
    if (error.code === "P2025") return res.status(404).json({ erro: "Anime não encontrado." });
    return next(error);
  }
}

export async function excluirAnime(req, res, next) {
  const id = converterIdAnime(req.params.id);
  if (id === null) return res.status(400).json({ erro: "ID inválido." });

  try {
    const anime = await animeModel.excluir(id);
    return res.status(200).json({ mensagem: "Anime removido com sucesso!", anime });
  } catch (error) {
    if (error.code === "P2025") return res.status(404).json({ erro: "Anime não encontrado." });
    return next(error);
  }
}