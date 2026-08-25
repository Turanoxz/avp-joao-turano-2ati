const express = require("express");
const animesRoutes = require("./routes/animes");

const app = express();
const PORT = 3000;

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Rota raiz apenas para confirmar que a API está no ar
app.get("/", (req, res) => {
  res.json({ mensagem: "API de Catálogo de Animes está rodando!" });
});

// Rotas do CRUD de animes
app.use("/animes", animesRoutes);

// Rota para qualquer caminho não encontrado
app.use((req, res) => {
  res.status(404).json({ erro: "Rota não encontrada." });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
