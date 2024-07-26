import {
  createAnimal,
  deleteAnimal,
  getAllAnimals,
  getAnimalById,
  getAvailableAnimals,
  
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
  removeAdoptionRequest,
  submitApplication,
  updateAdoptionRequestStatus
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


// adoption controller
router.post("/pet/submit", submitApplication);
// all adopted pets
router.get("/pet/adopted", getAllAdoptedPets);

router.put("/pet/adoption-request/:id", updateAdoptionRequestStatus); // Update adoption request status

// delelte
router.post("/delete-request",removeAdoptionRequest)


// get user details
router.get("/get-user",authToken, userDetailsController);

export default router;
