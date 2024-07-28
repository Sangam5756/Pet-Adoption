import React, { useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserContext, UserProvider } from "../context/UserContext";
import Loading from "./Loading";

const AdoptionRequests = () => {
  const [requests, setRequests] = useState([]);
  const [deleterequest, setDelete] = useState(false)
  const [loader, setLoader] = useState(false);


  const { user,fetchUser} = useContext(UserContext)
  const navigate = useNavigate();

  const fetchRequests = async () => {
    try {
      setLoader(true);

      const response = await api.get("/api/pet/adopted");
      setRequests(response.data.data);
      if(response.data.success){
        setTimeout(() => setLoader(false), 500); // 500ms delay

      }
    } catch (error) {
      setLoader(false);

      console.error("Error fetching adoption requests:", error);
    }
  };

  const handleUpdateStatus = async (requestId, petId, status) => {
    try {
      // Update adoption request status
      await api.put(`/api/pet/adoption-request/${requestId}`, { status });

      // Refresh requests
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === requestId ? { ...request, status } : request
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDeleterequest = async (requestId) => {

    try {


      await api.post("/api/delete-request", { id: requestId });

      setRequests((prev) => {
        prev.filter((request) => request._id !== requestId)
      })
      setDelete(true);

    } catch (error) {
      console.error("Error deleting request:", error);

    }

  }

  useEffect(() => {
    fetchRequests();
    fetchUser()

  }, [deleterequest])

  console.log(user,"adotopnrequeas")
  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [])




  return (
    <div className="container lg:mx-auto p-4 min-h-[88vh]">
      <h1 className="text-center font-semibold lg:text-lg mb-5">Adoption Requests</h1>

      {
        loader ? (
          (<Loading/>)
          
        ) :
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {requests.map((request) => (
              <div key={request?._id} className="p-4 border rounded-lg shadow-md">
                <h2 className="font-semibold">{request.name}</h2>
                <img src={request?.petId.imageUrl} alt={request.petId.name} className="w-full h-48 object-cover" />
                <p>Email: {request?.email}</p>
                <p>Phone: {request?.phone}</p>
                <p>Address: {request?.address}</p>
                <p>Status: {request?.status}</p>
                <p>Pet Name: {request?.petId.name}</p>
                <p>Breed: {request?.petId.breed}</p>
                <p>Age: {request?.petId.age}</p>
                {request?.status === "adopted" && <p className="font-semibold mt-2">Adopted</p>}
                <div className="mt-2 flex justify-between  items-center ">
                  <div>{request?.status !== "adopted" && <button
                    className=" px-2 py-1 bg-green-500 hover:bg-green-700 duration-200 text-white rounded"
                    onClick={() => handleUpdateStatus(request?._id, request.petId._id, "adopted")}
                  >
                    Mark as Adopted
                  </button>}
                  </div>
                  <div>
                    <button onClick={() => handleDeleterequest(request?._id)} className="bg-red-600 rounded px-2 text-white duration-200 hover:bg-red-800 py-1">Delete</button>
                  </div>
                </div>

              </div>
            ))}
          </div>
      }
    </div>
  );
};

export default AdoptionRequests;
