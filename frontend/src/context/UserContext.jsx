import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';

// Create the context
const UserContext = createContext();

// Create the provider component
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user details from API
  const fetchUser = async () => {
    try {
      const response = await api.get('/api/get-user', { withCredentials: true });
      setUser(response.data.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Function to handle user logout
  const logout = () => {
    // Remove user data from state
    document.cookie = "token";
    setUser(null);
    


    // Optionally clear cookies or tokens here
    // For example:
    // document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  return (
    <UserContext.Provider value={{ user, logout ,fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
