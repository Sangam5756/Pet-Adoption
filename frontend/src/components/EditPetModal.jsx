import React, { useState } from 'react';

const EditPetModal = ({ pet, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: pet.name,
        breed: pet.breed,
        age: pet.age,
        imageUrl: pet.imageUrl,
        adoptionStatus: pet.adoptionStatus
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Edit Pet</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Breed</label>
                        <input
                            type="text"
                            name="breed"
                            value={formData.breed}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Age</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Image URL</label>
                        <input
                            type="text"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Adoption Status</label>
                        <select
                            name="adoptionStatus"
                            value={formData.adoptionStatus}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        >
                            <option value="available">Available</option>
                            <option value="adopted">Adopted</option>
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="px-3 py-2 bg-gray-500 hover:bg-gray-700 text-white rounded mr-2"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-3 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPetModal;
