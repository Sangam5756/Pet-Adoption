import React, { useEffect, useState } from 'react'
import AnimalList from './AnimalList';
import api from '../services/api';
import Loading from "../components/Loading"

const Available_Animals = () => {

  const [animals, setAnimals] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        setLoader(true);
        
        const response = await api.get('/api/pet/available');
        setAnimals(response.data.data);
        if(response.data.success){
          setTimeout(() => setLoader(false), 2000); // 500ms delay

        }


      } catch (error) {
        setLoader(false);

        console.error('Error fetching animals:', error);
      }
    };


    fetchAnimals();
  }, []);


  return (
    <div className='p-4 min-h-[88vh] lg:min-h-[82vh]'>
      <h1 className='text-center text-2xl  capitalize font-semibold'>Welcome to the Pet Adoption Center</h1>
      {
        loader ? (<Loading />) :


          (<AnimalList animals={animals} loader={loader} />)
      }
    </div>
  )
}

export default Available_Animals