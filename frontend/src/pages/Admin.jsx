import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import api from '../services/api';
import { UserContext } from '../context/UserContext';


const Admin = () => {
  const { user } = useContext(UserContext)

  console.log(user);
  const navigate = useNavigate();

  useEffect(() => {

    if (!user) {
      navigate("/login");
      
    }
  }, [])



  return (
    <div>
      <h1 className='text-center text-2xl'>Admin Panel</h1>
      {/*  */}
      <div className='min-h-[88vh] bg-slate-100 flex item-center text-center  justify-center'>
          

        <div className='flex justify-center lg:flex-row flex-col   items-center '>
          <div className=' shadow-2xl rounded flex items-center m-4 p-4 h-32 w-full duration-300 hover:bg-red-400   shadow-black '>
            <Link className='' to={"/adoption-request"}>Adoption-request</Link>
          </div>
          <div className=' m-4 flex items-center rounded shadow-2xl w-full hover:bg-red-400 duration-300 shadow-black p-4 h-32'>
            <Link to={"/manage-pets"}>Manage Pets</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin