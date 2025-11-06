import { Router } from "express";
import * as animalesController from "../controllers/animalesController.js";

const router = Router();

router.get("/", animalesController.getAllAnimals);
router.get("/:id", animalesController.getAnimalById);
router.post("/", animalesController.saveAnimal);

export default router;
