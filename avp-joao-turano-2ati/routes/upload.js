import { Router } from "express";
import { uploadImagem } from "../middleware/upload.js";
import { responderUploadImagem } from "../controllers/uploadController.js";

const router = Router();

router.post("/", uploadImagem, responderUploadImagem);

export default router;
