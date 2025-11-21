import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { Menu, X } from "lucide-react";
import { IGIDR_LOGO } from "../../../utils/constants";
import { useAuth } from "../../context/AuthContext";

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();
    const { logout } = useAuth();
    const Links = [
        { name: "Menu", path: "/home" },
        { name: "Profile", path: "/profile" },
        { name: "Lunch", path: "/lunch" },
        { name: "Dinner", path: "/dinner" },
    ];

    const linkClasses = ({ isActive }) =>
        `relative text-md font-medium px-2 py-1 rounded transition-all duration-300
        ${isActive ? "text-[#FFD369] underline underline-offset-4" : "text-white hover:text-[#FFD369]"}`;

    return (
        <nav jsx="true" className="bg-[#1e1e2f] text-white shadow-md relative z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                {/* Brand + Hamburger */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="md:hidden focus:outline-none hover:scale-110 transition-transform"
                    >
                        <Menu size={28} />
                    </button>
                    <img
                        src={IGIDR_LOGO}
                        alt="IGIDR Logo"
                        className="w-12 bg-white p-1 shadow-lg"
                    />
                    <h1 className="text-3xl font-bold text-[#FFD369] tracking-widest">IGIDR</h1>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-10 text-lg">
                    {Links.map((link) => (
                        <NavLink key={link.name} to={link.path} className={linkClasses}>
                            {link.name}
                            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#FFD369] transition-all group-hover:w-full duration-300" />
                        </NavLink>
                    ))}
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            logout();
                            navigate("/login");
                        }} className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md font-semibold transition-all">
                        Logout
                    </button>
                </div>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Mobile Drawer */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-[#2d2d44] text-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl
                ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex items-center justify-between px-5 py-4 border-b border-[#444466]">
                    <span className="text-xl font-semibold">Menu</span>
                    <button onClick={() => setIsOpen(false)}>
                        <X size={24} className="hover:text-red-400 transition-colors" />
                    </button>
                </div>

                <div className="flex flex-col px-6 py-6 gap-6 text-md">
                    {Links.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                                `transition-all duration-200 px-2 py-1 rounded ${isActive ? "text-[#FFD369] font-semibold underline underline-offset-4" : "text-white hover:text-[#FFD369]"
                                }`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            logout();
                            navigate("/login");
                        }}
                        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold shadow-md transition-all duration-300 mt-6"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}
