import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';


const Admin = () => {

  const user = useSelector((state) => state?.user?.user); // Ensure correct path

  const navigate = useNavigate();
  console.log(user)



  return (
    <div>
      {/*  */}
      <div className='min-h-[84vh] bg-slate-100 flex item-center text-center  justify-center'>
      
        
        <div className='flex justify-center    items-center '>
          <div className=' shadow-2xl rounded flex items-center m-4 p-4 h-32 duration-300 hover:bg-red-400   shadow-black '>
            <Link className='' to={"/adoption-request"}>Adoption-request</Link>
          </div>
          <div className='w-fit m-4 flex items-center rounded shadow-2xl hover:bg-red-400 duration-300 shadow-black p-4 h-32'>
            <Link to={"/manage-pets"}>Manage-Pets</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin