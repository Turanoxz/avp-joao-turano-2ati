import "./config/env.js";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import swaggerUi from "swagger-ui-express";
import animesRoutes from "./routes/animes.js";
import usuariosRoutes from "./routes/usuarios.js";
import uploadRoutes from "./routes/upload.js";
import swaggerDocument from "./swagger.js";
import { autenticar } from "./middleware/auth.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { prisma } from "./db/prisma.js";

const app = express();
const PORT = Number(process.env.PORT || 3000);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.json({ mensagem: "API de Catálogo de Animes está rodando!" });
});

app.use("/usuarios", usuariosRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/animes", autenticar, animesRoutes);
app.use("/upload", autenticar, uploadRoutes);

app.use((req, res) => {
  res.status(404).json({ erro: "Rota não encontrada." });
});
app.use(errorHandler);

const server = app.listen(PORT, async () => {
  try {
    await prisma.$connect();
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  } catch (error) {
    console.error("Não foi possível conectar ao banco de dados:", error.message);
    server.close(() => process.exit(1));
  }
});

async function encerrarServidor() {
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

process.on("SIGINT", encerrarServidor);
process.on("SIGTERM", encerrarServidor);
