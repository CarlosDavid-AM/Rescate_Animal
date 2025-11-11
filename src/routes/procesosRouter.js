import { Router } from "express";
import * as procesosController from "../controllers/procesosController.js";
import { uploadPdf } from '../config/multerConfig.js';

const router = Router();

router.get("/", procesosController.getAllProcess);
router.get("/:id", procesosController.getProcessById);
router.post("/", procesosController.saveProcess);
router.put("/:id", procesosController.updateProcess);
router.delete("/:id", procesosController.deleteProcess);

// Ruta para subir PDF de un proceso
router.post("/:id/pdf", uploadPdf.single('proceso_pdf'), procesosController.uploadProcessPdf);

export default router;