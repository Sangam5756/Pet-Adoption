import Animal from "../models/pet.model.js";

export const getAvailableAnimals = async (req, res) => {
  try {
    const animals = await Animal.find({ adoptionStatus: 'available' });
    res.json({
      data: animals,
      message: "all pets",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err,
      success: false,
      error: true,
    });
  }
};


export const getAllAnimals = async (req, res) => {
  try {
    const animals = await Animal.find();
    res.json({
      data: animals,
      message: "all pets",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err,
      success: false,
      error: true,
    });
  }
};


export const getAnimalById = async (req, res) => {
  try {
    const animal = await Animal.findById(req.body);
    if (!animal) return res.status(404).json({ message: "Animal not found" });
    res.json({
      data: animal,
      message: "pet by id",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
      success: false,
      error: true,
    });
  }
};


export const createAnimal = async (req, res) => {
  // const animal = new Animal(req.body);
  
  try {
    const newAnimal = await animal.save();

    res.status(201).json({
      message: "pet added successfully",
      data: newAnimal,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err,
      success: false,
      error: true,
    });
  }
};

export const updateAnimal = async (req, res) => {
  const { id } = req.body;
  const updateData = req.body;

  try {
    const animal = await Animal.findById(id);
    if (!animal) {
      return res.status(404).json({ message: "Animal not found" });
    }

    console.log(animal)

    const updatedAnimal = await Animal.findByIdAndUpdate(id, updateData, { new: true });

    res.json({
      message: "Pet updated successfully",
      data: updatedAnimal,
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



export const deleteAnimal = async (req, res) => {
  try {
    const animal = await Animal.findById(req.body);
    if (!animal) return res.status(404).json({ message: "Animal not found" });

    await animal.deleteOne();
    res.json({ message: "Animal removed" });
  } catch (err) {
    res.status(400).json({
      message: err,
      success: false,
      error: true,
    });
  }
};






