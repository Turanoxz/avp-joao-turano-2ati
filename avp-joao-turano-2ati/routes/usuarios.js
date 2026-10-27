import { Router } from "express";
import { cadastrarUsuario, loginUsuario } from "../controllers/usuariosController.js";

const router = Router();

router.post("/", cadastrarUsuario);
router.post("/login", loginUsuario);

export default router;
