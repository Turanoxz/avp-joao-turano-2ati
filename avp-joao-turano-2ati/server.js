const express = require("express");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const animesRoutes = require("./routes/animes");
const usuariosRoutes = require("./routes/usuarios");
const uploadRoutes = require("./routes/upload");
const swaggerDocument = require("./swagger");
const { autenticar } = require("./middleware/auth");

const app = express();
const PORT = 3000;

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rota raiz apenas para confirmar que a API está no ar
app.get("/", (req, res) => {
  res.json({ mensagem: "API de Catálogo de Animes está rodando!" });
});

// Rotas públicas de cadastro e login
app.use("/usuarios", usuariosRoutes);

// Documentação pública da API
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas da AV1 protegidas por token JWT
app.use("/animes", autenticar, animesRoutes);
app.use("/upload", autenticar, uploadRoutes);

// Rota para qualquer caminho não encontrado
app.use((req, res) => {
  res.status(404).json({ erro: "Rota não encontrada." });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
