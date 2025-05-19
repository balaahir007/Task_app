import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import useAuthStore from "../zustand/authStore";

const Home = () => {
  const {user} = useAuthStore()
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex items-center justify-center px-4">
      <div className="max-w-5xl w-full bg-white shadow-2xl rounded-3xl p-10 text-gray-800">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-indigo-600 mb-4">
            Welcome to Listify Pro
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            An efficient platform for admin users to manage agents, upload contact lists, and distribute tasks automatically.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link
            to={`${user ? "/admin/dashboard" : "/login"}`}
            className="bg-indigo-600 hover:bg-indigo-700 flex items-center text-white py-3 px-8 rounded-xl font-semibold text-lg transition duration-300 shadow-lg"
          >
            {user ? (
              <>
                <MdDashboard className="inline mr-2 text-xl" />
                Admin Dashboard
              </>
            ) : (
              "🔐 Admin Login"
            )}
          </Link>
          <Link
            to="/about"
            className="border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white py-3 px-8 rounded-xl font-semibold text-lg transition duration-300 shadow-lg"
          >
            📘 Learn More
          </Link>
        </div>

        <div className="mt-16 text-center text-gray-400 text-sm">
          &copy; 2025 Listify Pro | Made with 💻 by Balaji
        </div>
      </div>
    </div>
  );
};

export default Home;
