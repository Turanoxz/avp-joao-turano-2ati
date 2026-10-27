import { Router } from "express";
import {
  criarAnime,
  excluirAnime,
  listarAnimePorId,
  listarAnimes,
  atualizarAnime
} from "../controllers/animesController.js";

const router = Router();

router.post("/", criarAnime);
router.get("/", listarAnimes);
router.get("/:id", listarAnimePorId);
router.put("/:id", atualizarAnime);
router.delete("/:id", excluirAnime);

export default router;
