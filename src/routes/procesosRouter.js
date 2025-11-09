import { Router } from "express";
import * as procesosController from "../controllers/procesosController.js";

const router = Router();

router.get("/", procesosController.getAllProcess);
router.get("/:id", procesosController.getProcessById);
router.post("/", procesosController.saveProcess);
router.delete("/:id", procesosController.deleteProcess);

export default router;
