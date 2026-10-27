import { prisma } from "../db/prisma.js";

export function buscarPorEmail(email) {
  return prisma.usuario.findUnique({ where: { email } });
}

export function criar(data) {
  return prisma.usuario.create({ data });
}