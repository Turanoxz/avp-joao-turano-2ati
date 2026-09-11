const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { usuarios, getProximoId } = require("../data/usuarios");
const { JWT_SECRET } = require("../middleware/auth");

const router = express.Router();

function usuarioSemSenha(usuario) {
  const { senha, ...dadosPublicos } = usuario;
  return dadosPublicos;
}

router.post("/", async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({
      erro: "Os campos 'nome', 'email' e 'senha' são obrigatórios."
    });
  }

  const emailNormalizado = email.trim().toLowerCase();
  const usuarioExistente = usuarios.find((usuario) => usuario.email === emailNormalizado);

  if (usuarioExistente) {
    return res.status(409).json({ erro: "Este email já está cadastrado." });
  }

  const senhaCriptografada = await bcrypt.hash(senha, 10);
  const novoUsuario = {
    id: getProximoId(),
    nome: nome.trim(),
    email: emailNormalizado,
    senha: senhaCriptografada
  };

  usuarios.push(novoUsuario);

  return res.status(201).json({
    mensagem: "Usuário cadastrado com sucesso!",
    usuario: usuarioSemSenha(novoUsuario)
  });
});

router.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  const emailNormalizado = typeof email === "string" ? email.trim().toLowerCase() : "";
  const usuario = usuarios.find((item) => item.email === emailNormalizado);

  if (!usuario || typeof senha !== "string" || !(await bcrypt.compare(senha, usuario.senha))) {
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
    usuario: usuarioSemSenha(usuario)
  });
});

module.exports = router;
