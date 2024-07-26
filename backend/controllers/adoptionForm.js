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


export const updateAdoptionRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  console.log(id)
  console.log(status)

  try {
    const adoptionRequest = await AdoptionApplication.findById(id).populate("petId");
    console.log(adoptionRequest)
    if (!adoptionRequest) return res.status(404).json({ message: "Adoption request not found" });

    
    const animalStatus = await Animal.findById(adoptionRequest?.petId);
    
    adoptionRequest.status = status;
    animalStatus.adoptionStatus = status
    await animalStatus.save();
    const updatedRequest = await adoptionRequest.save();
    
    console.log("applicationstatus update",updatedRequest)
    res.json({
      message: "Adoption request status updated successfully",
      data: updatedRequest,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
      success: false,
      error: true,
    });
  }
};

export const removeAdoptionRequest = async (req, res) => {
  const { id } = req.body;
  console.log(id)

  try {
    const request = await AdoptionApplication.findById(id);
    console.log("fasdfasdfds",request)
    if (!request) {
      return res.status(404).json({ message: "Adoption request not found" });
    }

    await request.deleteOne();
    res.json({ message: "Adoption request removed" });
  } catch (err) {
    res.status(400).json({
      message: err.message,
      success: false,
      error: true,
    });
  }
};