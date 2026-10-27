import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as usuarioModel from "../models/usuarioModel.js";
import { JWT_SECRET } from "../config/security.js";
import { validarCadastroUsuario, validarCredenciais } from "../utils/validacoes.js";

function usuarioPublico(usuario) {
  const { senhaHash, ...dadosPublicos } = usuario;
  return dadosPublicos;
}

export async function cadastrarUsuario(req, res, next) {
  const validacao = validarCadastroUsuario(req.body);
  if (validacao.erro) return res.status(400).json({ erro: validacao.erro });

  try {
    const usuarioExistente = await usuarioModel.buscarPorEmail(validacao.data.email);
    if (usuarioExistente) return res.status(409).json({ erro: "Este email já está cadastrado." });

    const usuario = await usuarioModel.criar({
      nome: validacao.data.nome,
      email: validacao.data.email,
      senhaHash: await bcrypt.hash(validacao.data.senha, 10)
    });

    return res.status(201).json({
      mensagem: "Usuário cadastrado com sucesso!",
      usuario: usuarioPublico(usuario)
    });
  } catch (error) {
    if (error.code === "P2002") return res.status(409).json({ erro: "Este email já está cadastrado." });
    return next(error);
  }
}

export async function loginUsuario(req, res, next) {
  const validacao = validarCredenciais(req.body);
  if (validacao.erro) return res.status(400).json({ erro: validacao.erro });

  try {
    const usuario = await usuarioModel.buscarPorEmail(validacao.data.email);
    if (!usuario || !(await bcrypt.compare(validacao.data.senha, usuario.senhaHash))) {
      return res.status(401).json({ erro: "Email ou senha inválidos." });
    }

    const token = jwt.sign(
      { id: usuario.id, nome: usuario.nome, email: usuario.email },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.status(200).json({
      mensagem: "Login realizado com sucesso!",
      token,
      usuario: usuarioPublico(usuario)
    });
  } catch (error) {
    return next(error);
  }
}