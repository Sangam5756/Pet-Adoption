import {
  createAnimal,
  deleteAnimal,
  getAllAnimals,
  getAnimalById,
  updateAnimal,
} from "../controllers/animal.controller.js";
import { login, register } from "../controllers/user.controller.js";
import express from "express";
import { authToken } from "../middleware/authToken.js";
import { petcart } from "../controllers/adoption.controller.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// animal routes
router.post("/pet/add-animal", authToken, createAnimal);
router.post("/pet/update-animal", updateAnimal);
router.post("/pet/get-animal", getAnimalById);
router.get("/pet/getall-animal", getAllAnimals);
router.post("/pet/delete-animal", authToken, deleteAnimal);

// adoption controller
router.post("/pet/adopt", petcart);

export default router;
