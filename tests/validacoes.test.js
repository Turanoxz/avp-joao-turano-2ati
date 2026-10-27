import test from "node:test";
import assert from "node:assert/strict";
import {
  converterIdAnime,
  validarAnime,
  validarCadastroUsuario,
  validarCredenciais
} from "../avp-joao-turano-2ati/utils/validacoes.js";

test("valida cadastro de anime e normaliza os textos", () => {
  assert.deepEqual(validarAnime({ titulo: "  Anime  ", genero: " Ação " }), {
    data: { titulo: "Anime", genero: "Ação" }
  });
});

test("rejeita campos obrigatórios ausentes e tipos inválidos no anime", () => {
  assert.match(validarAnime({ titulo: "Anime" }).erro, /genero/);
  assert.match(validarAnime({ titulo: "Anime", genero: "Ação", episodios: "3" }).erro, /episodios/);
  assert.match(validarAnime({ titulo: "Anime", genero: "Ação", status: "pausado" }).erro, /status/);
  assert.match(validarAnime({ titulo: "Anime", genero: "Ação", nota: 11 }).erro, /nota/);
});

test("atualização de anime exige pelo menos um campo permitido", () => {
  assert.match(validarAnime({}, true).erro, /ao menos um campo/);
  assert.match(validarAnime({ campoArbitrario: true }, true).erro, /não permitido/);
  assert.deepEqual(validarAnime({ nota: null }, true), { data: { nota: null } });
});

test("converte somente IDs inteiros positivos e seguros", () => {
  assert.equal(converterIdAnime("12"), 12);
  assert.equal(converterIdAnime("0"), null);
  assert.equal(converterIdAnime("1.5"), null);
  assert.equal(converterIdAnime("abc"), null);
});

test("valida e normaliza o cadastro de usuário", () => {
  assert.deepEqual(validarCadastroUsuario({
    nome: " Joana ",
    email: "JOANA@example.com ",
    senha: "SenhaSegura2026!"
  }), {
    data: { nome: "Joana", email: "joana@example.com", senha: "SenhaSegura2026!" }
  });
  assert.match(validarCadastroUsuario({ nome: "J", email: "email-invalido", senha: "123" }).erro, /e-mail válido/);
});

test("valida formato mínimo das credenciais de login", () => {
  assert.deepEqual(validarCredenciais({ email: " TESTE@example.com ", senha: "abc" }), {
    data: { email: "teste@example.com", senha: "abc" }
  });
  assert.match(validarCredenciais({ email: "invalido", senha: "abc" }).erro, /e-mail válido/);
});