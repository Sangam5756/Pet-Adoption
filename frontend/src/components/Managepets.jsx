import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Managepets = () => {

    const user = useSelector((state) => state?.user?.user); // Ensure correct path

    const navigate = useNavigate();
    console.log(user)
  
    useEffect(() => {
  
      if (user === null) {
        navigate("/login")
  
      }
    }, [])
    return (
        <div className="container lg:mx-auto p-4 min-h-[84vh]">
            Managepets</div>
    )
}

export default Managepets