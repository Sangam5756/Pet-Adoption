import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import Admin from "../pages/Admin";
import AdoptionForm from "../components/form";
import AdoptionRequests from "../components/AdoptionRequests";
import  Available_Animals from "../components/Available_Animals";
import Managepets from "../components/Managepets";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "available",
        element: <Available_Animals />,
      },
      {
        path: "login",
        element: <LoginPage />
      },
      {
        path: "form",
        element: <AdoptionForm />
      },
      {
        path: "admin",
        element: <Admin />,
      },
       {
        path: "adoption-request",
        element: <AdoptionRequests />
      }
      ,
       {
        path: "manage-pets",
        element: <Managepets />
      }
      


    ],
  },
]);

export default router;


// 1:02