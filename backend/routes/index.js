import {
  createAnimal,
  deleteAnimal,
  getAllAnimals,
  getAnimalById,
  getAvailableAnimals,
  getFilteredPets,
  updateAnimal,
} from "../controllers/animal.controller.js";
import {
  login,
  register,
  userDetailsController,
  userLogout,
} from "../controllers/user.controller.js";
import express from "express";
import { authToken } from "../middleware/authToken.js";
import {
  getAllAdoptedPets,
  submitApplication,
} from "../controllers/adoptionForm.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout",userLogout);

// animal routes
router.post("/pet/add-animal", authToken, createAnimal);
router.post("/pet/update-animal", updateAnimal);
router.post("/pet/get-animal",authToken ,getAnimalById);
router.get("/pet/getall-animal", getAllAnimals);
router.post("/pet/delete-animal", authToken, deleteAnimal);

// ALL AVAILABLE PETS
router.get("/pet/available", getAvailableAnimals);
// filter per
router.post('/pet/filter', getFilteredPets);


// adoption controller
router.post("/pet/submit", submitApplication);
// all adopted pets
router.get("/pet/adopted", getAllAdoptedPets);

// get user details
router.get("/get-user",authToken, userDetailsController);

export default router;
