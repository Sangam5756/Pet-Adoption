import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import api from './services/api';
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {

  const dispatch = useDispatch();

  const [data, setData] = useState(null);

  const fetchUserDetails = async () => {

    const dataResponse = await api.get('/api/get-user', {
      withCredentials: true
    });

    console.log("app jsx data", dataResponse)
    localStorage.setItem('email',dataResponse.email)
    const data = dataResponse.data.data;


    if (dataResponse.data.success) {
      setData(dataResponse?.data?.data);
      dispatch(setUserDetails(data));
    }
  };

  console.log("data", data)

  useEffect(() => {
    fetchUserDetails();




  }, [])



  return (


    <>
     
      <Navbar />
      <ToastContainer />
      <main >
        <Outlet />
      </main>
      <Footer />
    </>

    // <Router>
    //   <Navbar />
    //   <Routes>
    //     <Route path="/" element={<HomePage />} />
    //     <Route path="/form" element={<AdoptionForm />} />

    //     {
    //      data?._id ? (
    //         <Route path="/admin" element={<Admin />} />
    //       ) :
    //       (<Route path="/login" element={<LoginPage />} />)

    //     }

    //   </Routes>
    //   <Footer />
    // </Router>
  );
};

export default App;
