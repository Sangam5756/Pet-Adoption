// controllers/animalController.js
import Animal from "../models/pet.model.js";


export const getAllAnimals = async (req, res) => {
  try {
    const animals = await Animal.find();
    res.json(animals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getAnimalById = async (req, res) => {
  try {
    const animal = await Animal.findById(req.body);
    if (!animal) return res.status(404).json({ message: 'Animal not found' });
    res.json(animal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const createAnimal = async (req, res) => {
  const animal = new Animal(req.body);
  try {
    
    const newAnimal = await animal.save();
    res.status(201).json(newAnimal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateAnimal = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const animal = await Animal.findById(id);
    if (!animal) return res.status(404).json({ message: 'Animal not found' });

    // Update only the fields that are provided in the request body
    if (updateData.name) animal.name = updateData.name;
    if (updateData.breed) animal.breed = updateData.breed;
    if (updateData.age) animal.age = updateData.age;
    if (updateData.adoptionStatus) animal.adoptionStatus = updateData.adoptionStatus;
    if (updateData.imageUrl) animal.imageUrl = updateData.imageUrl;

    const updatedAnimal = await animal.save();
    res.json({
      message: 'Animal updated successfully',
      data: updatedAnimal,
      success: true,
      error: false
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
      success: false,
      error: true
    });
  }
};


export const deleteAnimal = async (req, res) => {
  try {
    const animal = await Animal.findById(req.body);
    if (!animal) return res.status(404).json({ message: 'Animal not found' });

    await animal.deleteOne();
    res.json({ message: 'Animal removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


