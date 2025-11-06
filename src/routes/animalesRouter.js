import { Router } from "express";
import * as animalesController from "../controllers/animalesController.js";

const router = Router();

router.get("/", animalesController.getAllAnimals);
router.post("/", animalesController.saveAnimal);

export default router;
