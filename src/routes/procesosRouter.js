import { Router } from "express";
import * as procesosController from "../controllers/procesosController.js";

const router = Router();

router.get("/", procesosController.getAllProcess);
router.post("/", procesosController.saveProcess);

export default router;
