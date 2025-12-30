import React from "react";
import { useAuth } from "../context/AuthContext";

// Placeholder Dashboard
const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="p-10 text-2xl font-bold">
      Welcome, {user?.name}
      <br />
      <img className="w-12 h-12 rounded-full" src={user?.avatar} alt="" />
      <br />
      <p>{user?.email}</p>
      <button
        onClick={logout}
        className="text-sm bg-red-500 text-white px-4 py-2 mt-4 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
