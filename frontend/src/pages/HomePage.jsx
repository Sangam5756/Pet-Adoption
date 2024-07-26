import React from 'react';
import AnimalList from '../components/AnimalList';
import  { useEffect, useState } from 'react';
import api from "../services/api"

const HomePage = () => {

  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await api.get('/api/pet/getall-animal');
        console.log("all-animals",response)
        setAnimals(response.data.data);
      } catch (error) {
        console.error('Error fetching animals:', error);
      }
    };


    fetchAnimals();
  }, []);


  return (
    <div className='p-4'>
      <h1 className='text-center text-2xl  capitalize font-semibold'>Welcome to the Pet Adoption Center</h1>
      <AnimalList  animals={animals}/>
    </div>
  );
};


export default HomePage;
