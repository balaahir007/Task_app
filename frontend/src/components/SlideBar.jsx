import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    MdOutlineLogout,
    MdOutlineDashboard,
    MdPeople,
    MdUploadFile,
} from "react-icons/md";
import useAuthStore from "../zustand/authStore";

const menus = [
    { id: "dashboard", label: "Dashboard", icon: <MdOutlineDashboard className="text-xl" />, path: "/admin/dashboard" },
    { id: "manage_agents", label: "Manage Agents", icon: <MdPeople className="text-xl" />, path: "/admin/agents" },
    { id: "upload_lists", label: "Upload Lists", icon: <MdUploadFile className="text-xl" />, path: "/admin/upload-tasks" },
    { id: "logout", label: "Logout", icon: <MdOutlineLogout className="text-xl" />, isLogout: true, path: "/login" },
];

const SlideBar = ({ onMenuClose }) => {
    const [activeMenu, setActiveMenu] = useState("dashboard");
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuthStore();

    useEffect(() => {
        const current = menus.find((menu) => menu.path === location.pathname);
        if (current) setActiveMenu(current.id);
    }, [location.pathname]);

    return (
        <aside className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg flex flex-col z-50">
            <div className="p-6 text-indigo-600 text-2xl font-bold border-b border-gray-200">
                Admin Panel
            </div>

            <nav className="flex flex-col flex-grow p-4 text-gray-700">
                {menus.map(({ id, label, icon, isLogout, path }) => {
                    const isActive = activeMenu === id;
                    return (
                        <div
                            key={id}
                            onClick={() => {
                                setActiveMenu(id);
                                onMenuClose();
                                if (isLogout) {
                                    logout();
                                    
                                    navigate(path,{state : {fromPage : '/admin/dashboard'}})
                                } else {
                                    navigate(path);
                                }
                            }}
                            className={`flex items-center gap-3 py-2 px-4 rounded cursor-pointer
                                ${isLogout ? "text-red-500 hover:bg-red-200 mt-auto" : "hover:bg-indigo-50"}
                                ${isActive && !isLogout ? "bg-indigo-100 font-semibold text-indigo-700" : ""}
                            `}
                        >
                            {icon}
                            {label}
                        </div>
                    );
                })}
            </nav>
        </aside>
    );
};

export default SlideBar;
