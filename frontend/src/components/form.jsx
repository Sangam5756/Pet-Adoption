// In AdoptionForm.jsx
import { toast } from "react-toastify";

import React, { useState } from 'react';

import api from '../services/api';
import { Link, useLocation, useNavigate } from "react-router-dom"

const AdoptionForm = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    petId: location.state || '',
  });
  const navigate = useNavigate();


  console.log(location.state)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/pet/submit', formData);
      console.log('Application submitted:', response.data);
      toast.success(response.data.success);
      navigate("/")

      

      // Handle successful submission, e.g., show a message, redirect, etc.
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <div className='mt-32 lg:mt-2  p-2 lg:p-0'>
      <form onSubmit={handleSubmit} className="lg:max-w-lg w-full   mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Adoption Application</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Submit Application</button>
      </form>
    </div>
  );
};

export default AdoptionForm;
