import { Router } from "express";
import * as procesosController from "../controllers/procesosController.js";

const router = Router();

router.get("/", procesosController.getAllProcess);

export default router;
