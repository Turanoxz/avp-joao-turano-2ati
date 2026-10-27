const camposAnime = new Set([
  "titulo",
  "genero",
  "temporadas",
  "episodios",
  "status",
  "nota",
  "sinopse"
]);

const statusAnime = new Set(["assistindo", "completo", "planejo assistir"]);
const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validarAnime(body, parcial = false) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { erro: "O corpo da requisição deve ser um objeto JSON." };
  }

  const desconhecidos = Object.keys(body).filter((campo) => !camposAnime.has(campo));
  if (desconhecidos.length > 0) {
    return { erro: `Campo(s) não permitido(s): ${desconhecidos.join(", ")}.` };
  }

  const data = {};
  for (const campo of ["titulo", "genero"]) {
    if (body[campo] !== undefined) {
      if (typeof body[campo] !== "string" || !body[campo].trim() || body[campo].trim().length > 191) {
        return { erro: `O campo '${campo}' deve ser um texto não vazio com até 191 caracteres.` };
      }
      data[campo] = body[campo].trim();
    } else if (!parcial) {
      return { erro: `O campo '${campo}' é obrigatório.` };
    }
  }

  for (const campo of ["temporadas", "episodios"]) {
    if (body[campo] !== undefined) {
      if (!Number.isInteger(body[campo]) || body[campo] < 0) {
        return { erro: `O campo '${campo}' deve ser um número inteiro maior ou igual a zero.` };
      }
      data[campo] = body[campo];
    }
  }

  if (body.status !== undefined) {
    if (typeof body.status !== "string" || !statusAnime.has(body.status)) {
      return { erro: "O campo 'status' deve ser 'assistindo', 'completo' ou 'planejo assistir'." };
    }
    data.status = body.status;
  }

  if (body.nota !== undefined) {
    if (body.nota !== null && (typeof body.nota !== "number" || !Number.isFinite(body.nota) || body.nota < 0 || body.nota > 10)) {
      return { erro: "O campo 'nota' deve ser um número entre 0 e 10 ou null." };
    }
    data.nota = body.nota;
  }

  if (body.sinopse !== undefined) {
    if (typeof body.sinopse !== "string") {
      return { erro: "O campo 'sinopse' deve ser um texto." };
    }
    data.sinopse = body.sinopse;
  }

  if (parcial && Object.keys(data).length === 0) {
    return { erro: "Envie ao menos um campo válido para atualizar." };
  }

  return { data };
}

export function converterIdAnime(valor) {
  const id = Number(valor);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

export function validarCadastroUsuario(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { erro: "O corpo da requisição deve ser um objeto JSON." };
  }

  const { nome, email, senha } = body;
  if (typeof nome !== "string" || !nome.trim() || nome.trim().length > 100) {
    return { erro: "O nome é obrigatório e deve ter até 100 caracteres." };
  }
  if (typeof email !== "string" || email.trim().length > 191 || !formatoEmail.test(email.trim())) {
    return { erro: "Informe um endereço de e-mail válido com até 191 caracteres." };
  }
  if (typeof senha !== "string" || senha.length < 8 || Buffer.byteLength(senha, "utf8") > 72) {
    return { erro: "A senha deve ter ao menos 8 caracteres e no máximo 72 bytes." };
  }

  return { data: { nome: nome.trim(), email: email.trim().toLowerCase(), senha } };
}

export function validarCredenciais(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { erro: "O corpo da requisição deve ser um objeto JSON." };
  }

  const { email, senha } = body;
  if (typeof email !== "string" || !formatoEmail.test(email.trim()) || typeof senha !== "string" || !senha) {
    return { erro: "Informe um e-mail válido e uma senha." };
  }

  return { data: { email: email.trim().toLowerCase(), senha } };
}