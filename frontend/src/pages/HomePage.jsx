import React from 'react';
import AnimalList from '../components/AnimalList';
import { useEffect, useState } from 'react';
import api from "../services/api"
import Loading from "../components/Loading"

const HomePage = () => {

  const [animals, setAnimals] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        setLoader(true);
        const response = await api.get('/api/pet/getall-animal');
        console.log("all-animals", response)
        setAnimals(response.data.data);
        setTimeout(() => setLoader(false), 500); // 500ms delay
      } catch (error) {
        console.error('Error fetching animals:', error);
        setLoader(false);

      }
    };


    fetchAnimals();
  }, []);


  return (
    <div className='p-4 lg:min-h-[82vh] min-h-[88vh]'>
      <h1 className='text-center text-2xl  capitalize font-semibold'>Welcome to the Pet Adoption Center</h1>
      {
        loader ? (<Loading />) :


          (<AnimalList animals={animals} loader={loader} />)
      }
    </div>
  );
};


export default HomePage;
