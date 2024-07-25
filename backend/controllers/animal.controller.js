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
  const { id } = req.params;
  const updateData = req.body;

  console.log(req.body)
  // const {status} = req.body

  // console.log(status)

  try {
    const animal = await Animal.findById(id);
    console.log(animal)
    
    // if (!animal) return res.status(404).json({ message: "Animal not found" });

    // Update only the fields that are provided in the request body

    const updateAnimal = await Animal.findByIdAndUpdate(id, req.body);

    await updateAnimal.save();
    res.json({
      message: "pet updated successfully",
      data: updateAnimal,
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



export const getFilteredPets = async (req, res) => {
  try {
    const { breed, age } = req.query;
    let filter = { adoptionStatus: 'available' };

    console.log(req.body)
    if (breed) {
      filter.breed = breed;
    }

    if (age) {
      filter.age = parseInt(age);
    }

    const pets = await Pet.find(filter);
    res.status(200).json({
      data: pets,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};

