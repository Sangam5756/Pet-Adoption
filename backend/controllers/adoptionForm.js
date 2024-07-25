// In controllers/adoptionApplication.controller.js

import AdoptionApplication from "../models/petadopt.js";
import Animal from "../models/pet.model.js";

export const submitApplication = async (req, res) => {
  const { name, email, phone, address, petId } = req.body;

  try {
    const pet = await Animal.findById(petId);
    if (!pet) {
      return res.status(404).json({
        message: "Pet not found",
        success: false,
        error: true,
      });
    }

    const application = new AdoptionApplication({
      name,
      email,
      phone,
      address,
      petId,
    });

    const savedApplication = await application.save();

    res.status(201).json({
      message: "Application submitted successfully",
      data: savedApplication,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};

export const getAllAdoptedPets = async (req, res) => {
  try {
    const response = await AdoptionApplication.find().populate('petId');
    console.log(response)


    res.status(200).json({
      data: response,
      message: "All adopted pet data",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
      success: false,
      error: true,
    });
  }
};
