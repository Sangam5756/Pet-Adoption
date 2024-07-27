import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { UserProvider,UserContext } from './context/UserContext';

const App = () => {

  

  return (


    <>
      <UserProvider>

        <Navbar />
        <ToastContainer />
        <main >
          <Outlet />
        </main>
        <Footer />
      </UserProvider>
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
