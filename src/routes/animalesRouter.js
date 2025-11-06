import { Router } from "express";
import * as animalesController from "../controllers/animalesController.js";

const router = Router();

router.get("/", animalesController.getAllAnimals);

export default router;
