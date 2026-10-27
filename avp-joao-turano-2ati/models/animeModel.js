import { prisma } from "../db/prisma.js";

export function criar(data) {
  return prisma.anime.create({ data });
}

export function listarTodos() {
  return prisma.anime.findMany({ orderBy: { id: "asc" } });
}

export function buscarPorId(id) {
  return prisma.anime.findUnique({ where: { id } });
}

export function atualizar(id, data) {
  return prisma.anime.update({ where: { id }, data });
}

export function excluir(id) {
  return prisma.anime.delete({ where: { id } });
}