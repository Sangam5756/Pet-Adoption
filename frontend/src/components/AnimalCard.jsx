import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdoptionForm from './form';


const AnimalCard = ({ animal }) => {

  const navigate = useNavigate();

  const handlenavigate = () => {

    navigate("/form",
      { state: animal._id }
    );

  }

  


  return (
    <div className="max-w-sm  rounded overflow-hidden shadow-lg m-4 bg-white">
      <div>
        <img className="w-full h-48 object-cover" src={animal.imageUrl} alt={animal.name} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{animal.name}</div>
          <p className="text-gray-700 text-base  text-ellipsis line-clamp-1">Breed: {animal.breed}</p>
          <p className="text-gray-700 text-base">Age: {animal.age}</p>
          <div className='flex gap-5'>
            <p className={`text-base font-semibold ${animal.adoptionStatus === 'available' ? 'text-green-500' : 'text-red-500'}`}>
              Status: {animal.adoptionStatus}
            </p>
            {animal.adoptionStatus === "available" &&
              (<p onClick={handlenavigate} className='text-white px-2 rounded bg-red-600 duration-300 cursor-pointer hover:bg-green-700'>Adopt</p>)
            }
          </div>
        </div>

      </div>
     

    </div>
   
  );
};

export default AnimalCard;
