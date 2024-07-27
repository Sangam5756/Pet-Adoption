import React, { useContext, useEffect, useState } from 'react';
import api from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';


const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  




  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/login', { email, password });

      console.log('Login successful:', response);

      if (response?.data?.success) {
        navigate("/")
        window.location.reload();
        toast.success(response.data.message);
        
      }


    } catch (error) {
      toast.error(response.data.message)
 
    }

  };





  return (
    <div className="flex items-center max-h-screen min-h-[80vh] justify-center ">
      <div className="w-full  max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
            onClick={handleLogin}
              type="submit"
              className="bg-blue-500 ml-0 mx-auto hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
