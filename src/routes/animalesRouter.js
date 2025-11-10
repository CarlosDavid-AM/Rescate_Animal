import { Router } from "express";
import * as animalesController from "../controllers/animalesController.js";

const router = Router();

router.get("/", animalesController.getAllAnimals);
router.get("/:id", animalesController.getAnimalById);
router.post("/", animalesController.saveAnimal);
router.put("/:id", animalesController.updateAnimal);
router.delete("/:id", animalesController.deleteAnimal);

export default router;
