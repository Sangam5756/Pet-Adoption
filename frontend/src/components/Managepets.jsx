import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditPetModal from './EditPetModal';
import AddPetModal from "./AddPetModal"
const ManagePets = () => {
    const user = useSelector((state) => state?.user?.user); // Ensure correct path
    const navigate = useNavigate();
    const [pets, setPets] = useState([]);
    const [selectedPet, setSelectedPet] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);


    useEffect(() => {
        if (user === null) {
            navigate("/login");
        } else {
            fetchPets();
        }
    }, []);

    const fetchPets = async () => {
        try {
            const response = await api.get('/api/pet/getall-animal');
            setPets(response.data.data);
        } catch (error) {
            console.error("Error fetching pets:", error);
            toast.error("Failed to fetch pets");
        }
    };


    const handleDeletePet = async (petId) => {
        try {
            await api.post(`/api/pet/delete-animal`,{id : petId},{
                withCredentials:true
            });

            setPets(prevPets => prevPets.filter(pet => pet._id !== petId));
            toast.success("Pet deleted successfully");
        } catch (error) {

            console.error("Error deleting pet:", error);
            toast.error("Failed to delete pet");
        }
    };

    const handleUpdatePet = async (petId, updatedData) => {
        try {
            await api.put(`/api/pet/update-animal`,{id : petId , updatedData : updatedData},{
                withCredentials:true
            });
            setPets(prevPets => prevPets.map(pet => (pet._id === petId ? { ...pet, ...updatedData } : pet)));
            toast.success("Pet updated successfully");
        } catch (error) {   
            console.error("Error updating pet:", error);
            toast.error("Failed to update pet");
        }
    };

    const handleEditClick = (pet) => {
        setSelectedPet(pet);
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = async (updatedPet) => {
        try {
            await handleUpdatePet(selectedPet._id, updatedPet);
            setIsEditModalOpen(false);
            setSelectedPet(null);
        } catch (error) {
            console.error("Error updating pet:", error);
            toast.error("Failed to update pet");
        }
    };


    const handleAddPet = async (newPetData) => {
        try {
            const response = await api.post('/api/pet/add-animal', newPetData,{
                withCredentials:true
            });
            setPets(prevPets => [...prevPets, response.data.data]);
            toast.success("Pet added successfully");
        } catch (error) {
            console.error("Error adding pet:", error);
            toast.error("Failed to add pet");
        }
    };

    return (
        <div className="container lg:mx-auto p-4 min-h-[84vh]">
            <h1 className="text-center font-semibold lg:text-lg mb-5">Manage Pets</h1>
            <div className="flex justify-end mb-4">
                <button
                    className="px-3 py-2 bg-green-500 hover:bg-green-700 text-white rounded"
                    onClick={() => setIsAddModalOpen(true)}
                >
                    Add Pet
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pets.map((pet) => (
                    <div key={pet._id} className="p-4 border rounded-lg shadow-md">
                        <h2 className="font-semibold">{pet.name}</h2>
                        <img src={pet.imageUrl} alt={pet.name} className="w-full h-48 object-cover" />
                        <p>Breed: {pet.breed}</p>
                        <p>Age: {pet.age}</p>
                        <p>Status: {pet.adoptionStatus}</p>
                        <div className="mt-2 flex justify-between items-center">
                            <button
                                className="px-2 py-1 bg-red-600 hover:bg-red-800 text-white rounded"
                                onClick={() => handleDeletePet(pet._id)}
                            >
                                Delete
                            </button>
                            <button
                                className="px-2 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded"
                                onClick={() => handleUpdatePet(pet._id, { adoptionStatus: 'adopted' })}
                            >
                                Mark as Adopted
                            </button>
                            <button
                                className="px-2 py-1 bg-yellow-500 hover:bg-yellow-700 text-white rounded"
                                onClick={() => handleEditClick(pet)}
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {isEditModalOpen && (
                <EditPetModal
                    pet={selectedPet}
                    onClose={() => setIsEditModalOpen(false)}
                    onSubmit={handleEditSubmit}
                />
            )}
              {isAddModalOpen && (
                <AddPetModal
                    onClose={() => setIsAddModalOpen(false)}
                    onSubmit={handleAddPet}
                />
            )}
        </div>
    );
};

export default ManagePets;
