import { Router } from "express";
import * as personasController from "../controllers/personasController.js";

const router = Router();

router.get("/", personasController.getAllPersonas);
router.get("/:id", personasController.getPersonaById);
router.post("/", personasController.savePersona);

export default router;
