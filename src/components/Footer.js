import React from "react";
import { Link } from "react-router";

const Footer = () => {
    return (
        <footer className="bg-gray-200 text-gray-800 w-full shadow-2xl p-6 sm:p-8">
            <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row sm:justify-between sm:items-center">

                {/* Left Section: Title and Description */}
                <div className="text-center sm:text-left mb-4 sm:mb-0">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-indigo-800 drop-shadow-md leading-tight">
                        🍽️ IGIDR Canteen Meal
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-xs sm:max-w-md mx-auto sm:mx-0">
                        Designed to simplify meal operations and enhance your dining experience with ease and efficiency.
                    </p>
                </div>

                {/* Right Section: Copyright Information */}
                <div className="text-center sm:text-right mt-4 sm:mt-0">
                    <p className="text-xs sm:text-sm text-gray-700 font-medium">
                        © {new Date().getFullYear()} <span className="font-semibold text-purple-700">IGIDR</span>. All rights reserved.
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
                        Developed By <Link target="_blank" to="https://whytedevil.netlify.app/" className="text-blue-700">Sudhanshu Barnwal</Link> for the IGIDR community.
                    </p>
                </div>
            </div>

            {/* Tailwind CSS CDN */}
            <script src="https://cdn.tailwindcss.com"></script>

            {/* Custom CSS for 'Inter' font */}
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
                    .font-inter {
                        font-family: 'Inter', sans-serif;
                    }
                `}
            </style>
        </footer>
    );
}

export default Footer;
