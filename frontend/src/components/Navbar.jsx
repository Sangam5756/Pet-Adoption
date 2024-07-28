import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { UserContext } from '../context/UserContext';

const Navbar = () => {


  const navigate = useNavigate();
  const { user,logout } = useContext(UserContext)

  const handleLogout = async () => {

    const response = api.get("/api/logout")

    console.log("Logout",response)
    logout();
    navigate("/")

  }


  return (
    <div>
      <nav className=' bg-slate-200  flex items-center justify-between gap-6 p-2 px-10 ml-0 mx-auto text-black '>
        <Link className=' rounded-sm px-2 py-1' to="/">Home</Link>
        <Link className=' rounded-sm px-2 py-1' to="/available">Available</Link>

        {
          user &&
          <Link to="/admin">admin</Link>
        }

        {
          !user &&
          <Link to="/login">login</Link>

        }

        {
          user &&
          <p className=' cursor-pointer' onClick={handleLogout}>Logout</p>
        }


      </nav>
    </div>
  );
};

export default Navbar;
