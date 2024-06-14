import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import http from "../services/axiosintercepters";

export default function Dashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const fetchUsers = () => {
    const url = "/get-user";
    
    http.get(url)
      .then((response) => {
        console.log(response.data);
        setUsers(response.data.data);  // Set the users state with the retrieved data
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  }

 

  return (
    <div className="w-full bg-gray-100 p-4">
    <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
    {error && <p className="text-red-500 mb-4">Error: {error}</p>}
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4" onClick={fetchUsers}>Fetch Users</button>
    <ul>
      {users.map(user => (
        <li key={user.id} className="text-gray-800">{user.name}</li>
      ))}
    </ul>
  </div>
  );
}
