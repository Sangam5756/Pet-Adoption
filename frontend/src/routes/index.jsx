import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import Admin from "../pages/Admin";
import AdoptionForm from "../components/form";


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
        path: "login",
        element:<LoginPage/>
      },
      {
        path: "form",
        element:<AdoptionForm/>
      },
      {
        path: "admin",
        element:<Admin/>
      },
    
    
    ],
  },
]);

export default router;


// 1:02