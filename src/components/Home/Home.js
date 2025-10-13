import React from 'react';
import { FaUtensils, FaMoon } from 'react-icons/fa'; // Assuming react-icons/fa is available
import weeklyMenu from '../../../utils/foodMenu';

const Home = () => {
    // Get current date and day
    const today = new Date();
    const day = today.toLocaleDateString('en-US', { weekday: 'long' });
    const formattedDate = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // Fallback to Monday if today's menu is not found
    const todayMenu = weeklyMenu[day] || weeklyMenu.Monday;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 font-inter text-gray-800 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <header className="text-center mb-8 sm:mb-12 animate-fade-in">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-800 drop-shadow-lg leading-tight">
                        🍽️ IGIDR Canteen Menu
                    </h1>
                    <p className="mt-3 text-sm sm:text-base md:text-lg text-gray-700 font-medium">
                        Your delicious meal selection for{' '}
                        <span className="text-purple-700 font-bold">
                            {day}, {formattedDate}
                        </span>
                    </p>
                </header>

                {/* Menu Cards Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
                    {/* Lunch Menu Card */}
                    <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 sm:hover:-translate-y-2 p-4 sm:p-6 md:p-10 border border-blue-100 bg-gradient-to-b from-[rgba(18,219,0,0.1)] via-white to-[rgba(18,219,0,0.1)]">
                        <div className="flex items-center mb-3 sm:mb-4 md:mb-6">
                            <FaUtensils className="text-teal-600 text-2xl sm:text-3xl md:text-4xl mr-2 sm:mr-3 md:mr-4 animate-bounce-in" />
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-teal-800">Lunch Delights</h2>
                        </div>
                        <ul className="list-none space-y-2 sm:space-y-3 md:space-y-4 text-sm sm:text-base md:text-lg text-gray-700">
                            {todayMenu.lunch.map((item, index) => (
                                <li
                                    key={index}
                                    className="flex items-center p-2 sm:p-3 md:p-3 bg-blue-50 rounded-lg shadow-sm hover:bg-blue-100 hover:text-teal-700 transition-all duration-300 cursor-pointer group"
                                >
                                    <span className="text-teal-500 mr-2 sm:mr-3 md:mr-3 text-base sm:text-lg md:text-xl">•</span>
                                    <span className="font-medium group-hover:font-semibold">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Dinner Menu Card */}
                    <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 sm:hover:-translate-y-2 p-4 sm:p-6 md:p-10 border border-pink-100 bg-gradient-to-b from-[rgba(219,0,172,0.1)] via-white to-[rgba(219,0,172,0.1)]">
                        <div className="flex items-center mb-3 sm:mb-4 md:mb-6">
                            <FaMoon className="text-purple-600 text-2xl sm:text-3xl md:text-4xl mr-2 sm:mr-3 md:mr-4 animate-bounce-in" />
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-800">Dinner Specials</h2>
                        </div>
                        <ul className="list-none space-y-2 sm:space-y-3 md:space-y-4 text-sm sm:text-base md:text-lg text-gray-700">
                            {todayMenu.dinner.map((item, index) => (
                                <li
                                    key={index}
                                    className="flex items-center p-2 sm:p-3 md:p-3 bg-pink-50 rounded-lg shadow-sm hover:bg-pink-100 hover:text-purple-700 transition-all duration-300 cursor-pointer group"
                                >
                                    <span className="text-purple-500 mr-2 sm:mr-3 md:mr-3 text-base sm:text-lg md:text-xl">•</span>
                                    <span className="font-medium group-hover:font-semibold">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Tailwind CSS CDN */}
            <script src="https://cdn.tailwindcss.com"></script>

            {/* Custom CSS */}
            <style jsx="true">
                {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
          .font-inter {
            font-family: 'Inter', sans-serif;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 1s ease-out forwards;
          }

          @keyframes bounceIn {
            0% { transform: scale(0.5); opacity: 0; }
            60% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); }
          }
          .animate-bounce-in {
            animation: bounceIn 0.8s ease-out forwards;
          }
        `}
            </style>
        </div>
    );
};

export default Home;
