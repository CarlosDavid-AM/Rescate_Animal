import { Router } from "express";
import * as animalesController from "../controllers/animalesController.js";
import { uploadImage } from '../config/multerConfig.js';

const router = Router();

router.get("/", animalesController.getAllAnimals);
router.get("/:id", animalesController.getAnimalById);
router.post("/", animalesController.saveAnimal);
router.put("/:id", animalesController.updateAnimal);
router.delete("/:id", animalesController.deleteAnimal);

// Ruta para subir imagen de un animal
router.post("/:id/foto", uploadImage.single('animal_foto'), animalesController.uploadAnimalImage);

export default router;
