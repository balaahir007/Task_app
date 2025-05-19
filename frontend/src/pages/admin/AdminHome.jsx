import React, { useEffect, useState } from 'react';
import SlideBar from '../../components/slideBar';
import { Outlet, useNavigate } from 'react-router-dom';
import useAuthStore from '../../zustand/authStore';

const AdminHome = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);



  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-30
          transform transition-transform duration-300 ease-in-out
          md:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
        <SlideBar onMenuClose={() => setSidebarOpen(false)} />
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className={`flex-1 p-4 md:p-8 
          md:ml-64
          ${sidebarOpen ? 'blur-sm' : ''}
        `}>
        <div className="md:hidden mb-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md text-gray-700 bg-white shadow hover:bg-indigo-50"
            aria-label="Toggle sidebar"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {sidebarOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <Outlet />
      </main>
    </div>
  );
};

export default AdminHome;
