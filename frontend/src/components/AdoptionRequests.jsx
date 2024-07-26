import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdoptionRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await api.get("/api/pet/adopted");
        setRequests(response.data.data);
      } catch (error) {
        console.error("Error fetching adoption requests:", error);
      }
    };
    fetchRequests();
  }, []);

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
      window.location.reload();
      await api.post("/api/delete-request", {id :requestId});

      setRequests((prev) => {
        prev.filter((request) => request._id !== requestId)
      })

    } catch (error) {
      console.error("Error deleting request:", error);

    }

  }
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
      <h1 className="text-center font-semibold lg:text-lg mb-5">Adoption Requests</h1>
      
      {
        requests ? (
          
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
                <button onClick={ () => handleDeleterequest(request?._id) } className="bg-red-600 rounded px-2 text-white duration-200 hover:bg-red-800 py-1">Delete</button>
              </div>
            </div>

          </div>
        ))}
      </div>
        ):(<p className="text-center m-5">No Request are Found</p>)
      }
    </div>
  );
};

export default AdoptionRequests;
