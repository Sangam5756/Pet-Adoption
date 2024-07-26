import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';


const Admin = () => {

  const user = useSelector((state) => state?.user?.user); // Ensure correct path

  const navigate = useNavigate();
  console.log(user)

  useEffect(() => {

    if (user === null) {
      navigate("/login")

    }
  }, [])


  return (
    <div className='min-h-[84vh] flex item-center  justify-center'>

      <div className='flex justify-center items-center'>
        <div className='bg-red-600 w-fit m-4 p-4 h-32 '>
          <Link className='' to={"/adoption-request"}>Adoption-request</Link>
        </div>
        <div className='bg-red-600 w-fit m-4 p-4 h-32'>
          <Link to={"/manage-pets"}>Manage-Pets</Link>
        </div>
      </div>
    </div>
  )
}

export default Admin