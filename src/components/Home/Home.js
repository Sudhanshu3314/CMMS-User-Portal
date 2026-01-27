import React, { useEffect, useState } from 'react';
import { FaUtensils, FaMoon, FaChevronLeft, FaChevronRight, FaClock, FaCalendarAlt } from 'react-icons/fa';
import MenuShimmer from './MenuShimmer';

const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

const Home = () => {
    const today = new Date();

    const [currentDate, setCurrentDate] = useState(today);
    const [menu, setMenu] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const day = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // Fetch menu whenever day changes
    useEffect(() => {
        const fetchMenu = async () => {
            try {
                setLoading(true);
                const res = await fetch(
                    `https://cmms-backends.vercel.app/menu/${day}`
                );
                const data = await res.json();

                if (!res.ok) throw new Error('Fetch failed');

                setMenu(data);
                setError(false);
            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchMenu();
    }, [day]);

    // Navigation handlers
    const goToPreviousDay = () => {
        const prev = new Date(currentDate);
        prev.setDate(currentDate.getDate() - 1);
        setCurrentDate(prev);
    };

    const goToNextDay = () => {
        const next = new Date(currentDate);
        next.setDate(currentDate.getDate() + 1);
        setCurrentDate(next);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 font-inter text-gray-800 py-4 sm:py-8 md:py-12 px-3 sm:px-4 md:px-6 lg:px-8 relative overflow-hidden">
            {/* Soft Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br from-orange-200/30 to-pink-200/30 rounded-full blur-3xl animate-blob"></div>
                <div className="absolute top-1/3 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-0 left-1/3 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br from-purple-200/30 to-orange-200/30 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header */}
                <header className="text-center mb-6 sm:mb-10 md:mb-16 animate-fade-in-up">
                    {/* Decorative Top Badge */}
                    <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6 bg-white/80 backdrop-blur-xl rounded-full border border-orange-200/50 shadow-lg shadow-orange-100/50">
                        <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-orange-400 rounded-full animate-pulse"></div>
                        <span className="text-xs sm:text-sm font-semibold text-orange-600 tracking-wide">TODAY'S MENU</span>
                        <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-pink-400 rounded-full animate-pulse animation-delay-500"></div>
                    </div>

                    {/* Main Title */}
                    <div className="mb-6 sm:mb-8">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-3 sm:mb-4 animate-float">
                            <span className="inline-block bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-transparent bg-clip-text drop-shadow-sm">
                                IGIDR Canteen
                            </span>
                        </h1>
                        <div className="flex justify-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                            <div className="h-1 w-12 sm:w-16 bg-gradient-to-r from-transparent via-orange-400 to-transparent rounded-full animate-pulse"></div>
                            <div className="h-1 w-12 sm:w-16 bg-gradient-to-r from-transparent via-pink-400 to-transparent rounded-full animate-pulse animation-delay-300"></div>
                            <div className="h-1 w-12 sm:w-16 bg-gradient-to-r from-transparent via-purple-400 to-transparent rounded-full animate-pulse animation-delay-700"></div>
                        </div>
                        <p className="text-xs sm:text-sm md:text-base text-gray-600 font-medium tracking-wide">
                            Your Daily Culinary Experience
                        </p>
                    </div>

                    {/* Date Display Card */}
                    <div className="inline-block mb-6 sm:mb-10 w-full max-w-sm px-3 sm:px-0">
                        <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-orange-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                            <div className="flex items-center gap-3 sm:gap-4">
                                <div className="p-2.5 sm:p-3 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl sm:rounded-2xl shadow-lg flex-shrink-0">
                                    <FaCalendarAlt className="text-white text-lg sm:text-xl" />
                                </div>
                                <div className="text-left flex-1 min-w-0">
                                    <p className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 text-transparent bg-clip-text truncate">
                                        {day}
                                    </p>
                                    <p className="text-xs sm:text-sm text-gray-600 font-medium truncate">{formattedDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Day Navigation - Mobile Optimized */}
                    <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-4 max-w-2xl mx-auto px-2 sm:px-0">
                        {/* Previous Button */}
                        <button
                            onClick={goToPreviousDay}
                            className="group relative flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur-xl text-gray-700 font-semibold shadow-lg hover:shadow-xl border border-gray-200 hover:border-orange-300 active:scale-95 transition-all duration-300 ease-out w-full sm:w-auto overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-pink-500/0 group-hover:from-orange-500/10 group-hover:to-pink-500/10 transition-all duration-500"></div>
                            <FaChevronLeft className="text-base sm:text-lg relative z-10 group-hover:-translate-x-1 transition-transform duration-300 flex-shrink-0" />
                            <span className="relative z-10 text-sm sm:text-base">Previous Day</span>
                        </button>

                        {/* Today Button */}
                        <button
                            onClick={() => setCurrentDate(today)}
                            className="group relative flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-orange-100 to-pink-100 backdrop-blur-xl text-gray-700 font-semibold shadow-lg hover:shadow-xl border border-orange-200 hover:border-orange-300 active:scale-95 transition-all duration-300 ease-out w-full sm:w-auto overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-pink-500/0 group-hover:from-orange-500/20 group-hover:to-pink-500/20 transition-all duration-500"></div>
                            <FaClock className="text-base sm:text-lg relative z-10 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
                            <span className="relative z-10 text-sm sm:text-base">Today</span>
                        </button>

                        {/* Next Button */}
                        <button
                            onClick={goToNextDay}
                            className="group relative flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white font-semibold shadow-lg shadow-orange-200/50 hover:shadow-xl hover:shadow-orange-300/50 active:scale-95 transition-all duration-300 ease-out w-full sm:w-auto overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-all duration-300"></div>
                            <span className="relative z-10 text-sm sm:text-base">Next Day</span>
                            <FaChevronRight className="text-base sm:text-lg relative z-10 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
                        </button>
                    </div>

                </header>

                {/* Loading / Error */}
                {loading && <MenuShimmer />}

                {error && (
                    <div className="flex items-center justify-center gap-3 sm:gap-4 p-4 sm:p-6 md:p-8 bg-red-50/90 backdrop-blur-xl border border-red-200 rounded-2xl sm:rounded-3xl shadow-xl animate-shake mx-3 sm:mx-0">
                        <div className="flex gap-1.5 sm:gap-2 flex-shrink-0">
                            <div className="w-2 sm:w-3 h-2 sm:h-3 bg-red-400 rounded-full animate-bounce"></div>
                            <div className="w-2 sm:w-3 h-2 sm:h-3 bg-red-400 rounded-full animate-bounce animation-delay-200"></div>
                            <div className="w-2 sm:w-3 h-2 sm:h-3 bg-red-400 rounded-full animate-bounce animation-delay-400"></div>
                        </div>
                        <span className="text-red-600 font-semibold text-sm sm:text-base md:text-lg">Failed to load menu</span>
                    </div>
                )}

                {/* Menu Cards */}
                {!loading && !error && menu && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 px-2 sm:px-0">

                        {/* Lunch Card */}
                        <div className="group animate-fade-in-left">
                            <div className="relative h-full bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-emerald-200/50 overflow-hidden">
                                {/* Soft Gradient Background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-teal-50/30 to-cyan-50/50 pointer-events-none"></div>

                                {/* Top Glow */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-24 sm:h-32 bg-emerald-200/30 blur-3xl rounded-full group-hover:bg-emerald-300/40 transition-all duration-500"></div>

                                <div className="relative p-4 sm:p-6 md:p-8 lg:p-10">
                                    {/* Header */}
                                    <div className="flex items-center gap-3 sm:gap-4 md:gap-5 mb-4 sm:mb-6 md:mb-8 pb-3 sm:pb-4 md:pb-6 border-b-2 border-emerald-200/50">
                                        <div className="relative flex-shrink-0">
                                            <div className="absolute inset-0 bg-emerald-300 rounded-xl sm:rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                                            <div className="relative p-2.5 sm:p-3 md:p-4 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl sm:rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-500">
                                                <FaUtensils className="text-white text-xl sm:text-2xl md:text-3xl" />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 text-transparent bg-clip-text mb-0.5 sm:mb-1">
                                                Lunch
                                            </h2>
                                            <p className="text-xs sm:text-sm text-emerald-600/70 font-medium tracking-wide">Midday Delicacies</p>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <div className="px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-emerald-100/80 rounded-full border border-emerald-200">
                                                <span className="text-xs sm:text-sm text-emerald-700 font-bold">{menu.lunch?.length || 0}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Menu Items */}
                                    <ul className="space-y-2.5 sm:space-y-3 md:space-y-4">
                                        {menu.lunch?.map((item, index) => (
                                            <li
                                                key={index}
                                                className="group/item relative flex items-start gap-2.5 sm:gap-3 md:gap-4 p-3 sm:p-4 md:p-5 bg-gradient-to-r from-emerald-50/80 to-teal-50/80 backdrop-blur-sm rounded-xl sm:rounded-2xl hover:from-emerald-100/90 hover:to-teal-100/90 transition-all duration-300 border border-emerald-200/40 hover:border-emerald-300/60 hover:shadow-lg hover:shadow-emerald-100/50 animate-slide-in"
                                                style={{ animationDelay: `${index * 100}ms` }}
                                            >
                                                <div className="relative flex-shrink-0">
                                                    <div className="absolute inset-0 bg-emerald-300 blur-md opacity-0 group-hover/item:opacity-40 transition-opacity duration-300 rounded-full"></div>
                                                    <span className="relative text-2xl sm:text-3xl group-hover/item:scale-125 transition-transform duration-300 inline-block">🍽️</span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <span className="font-semibold text-gray-700 text-sm sm:text-base leading-relaxed group-hover/item:text-gray-900 transition-colors duration-300 block">
                                                        {item}
                                                    </span>
                                                    <div className="h-0.5 bg-gradient-to-r from-emerald-400/0 via-emerald-400/50 to-emerald-400/0 mt-2 transform scale-x-0 group-hover/item:scale-x-100 transition-transform duration-500"></div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Bottom Accent */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400/0 via-emerald-400/50 to-emerald-400/0"></div>
                            </div>
                        </div>

                        {/* Dinner Card */}
                        <div className="group animate-fade-in-right">
                            <div className="relative h-full bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-purple-200/50 overflow-hidden">
                                {/* Soft Gradient Background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-pink-50/30 to-indigo-50/50 pointer-events-none"></div>

                                {/* Top Glow */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-24 sm:h-32 bg-purple-200/30 blur-3xl rounded-full group-hover:bg-purple-300/40 transition-all duration-500"></div>

                                <div className="relative p-4 sm:p-6 md:p-8 lg:p-10">
                                    {/* Header */}
                                    <div className="flex items-center gap-3 sm:gap-4 md:gap-5 mb-4 sm:mb-6 md:mb-8 pb-3 sm:pb-4 md:pb-6 border-b-2 border-purple-200/50">
                                        <div className="relative flex-shrink-0">
                                            <div className="absolute inset-0 bg-purple-300 rounded-xl sm:rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                                            <div className="relative p-2.5 sm:p-3 md:p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-500">
                                                <FaMoon className="text-white text-xl sm:text-2xl md:text-3xl" />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text mb-0.5 sm:mb-1">
                                                Dinner
                                            </h2>
                                            <p className="text-xs sm:text-sm text-purple-600/70 font-medium tracking-wide">Evening Specialties</p>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <div className="px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-purple-100/80 rounded-full border border-purple-200">
                                                <span className="text-xs sm:text-sm text-purple-700 font-bold">{menu.dinner?.length || 0}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Menu Items */}
                                    <ul className="space-y-2.5 sm:space-y-3 md:space-y-4">
                                        {menu.dinner?.map((item, index) => (
                                            <li
                                                key={index}
                                                className="group/item relative flex items-start gap-2.5 sm:gap-3 md:gap-4 p-3 sm:p-4 md:p-5 bg-gradient-to-r from-purple-50/80 to-pink-50/80 backdrop-blur-sm rounded-xl sm:rounded-2xl hover:from-purple-100/90 hover:to-pink-100/90 transition-all duration-300 border border-purple-200/40 hover:border-purple-300/60 hover:shadow-lg hover:shadow-purple-100/50 animate-slide-in"
                                                style={{ animationDelay: `${index * 100}ms` }}
                                            >
                                                <div className="relative flex-shrink-0">
                                                    <div className="absolute inset-0 bg-purple-300 blur-md opacity-0 group-hover/item:opacity-40 transition-opacity duration-300 rounded-full"></div>
                                                    <span className="relative text-2xl sm:text-3xl group-hover/item:scale-125 transition-transform duration-300 inline-block">🌙</span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <span className="font-semibold text-gray-700 text-sm sm:text-base leading-relaxed group-hover/item:text-gray-900 transition-colors duration-300 block">
                                                        {item}
                                                    </span>
                                                    <div className="h-0.5 bg-gradient-to-r from-purple-400/0 via-purple-400/50 to-purple-400/0 mt-2 transform scale-x-0 group-hover/item:scale-x-100 transition-transform duration-500"></div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Bottom Accent */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400/0 via-purple-400/50 to-purple-400/0"></div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <footer className="mt-8 sm:mt-12 md:mt-16 text-center px-3 sm:px-0">
                    <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white/80 backdrop-blur-xl rounded-full border border-gray-200/50 shadow-lg">
                        <div className="flex gap-1 sm:gap-1.5">
                            <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-orange-400 rounded-full animate-pulse"></div>
                            <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-pink-400 rounded-full animate-pulse animation-delay-200"></div>
                            <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-purple-400 rounded-full animate-pulse animation-delay-400"></div>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 font-medium">Crafted with ❤️ for IGIDR</p>
                    </div>
                </footer>
            </div>

            {/* Custom Animations */}
            <style jsx="true">{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

                .font-inter {
                    font-family: 'Inter', sans-serif;
                }

                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes fadeInLeft {
                    from { opacity: 0; transform: translateX(-30px); }
                    to { opacity: 1; transform: translateX(0); }
                }

                @keyframes fadeInRight {
                    from { opacity: 0; transform: translateX(30px); }
                    to { opacity: 1; transform: translateX(0); }
                }

                @keyframes slideIn {
                    from { opacity: 0; transform: translateX(-20px); }
                    to { opacity: 1; transform: translateX(0); }
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }

                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    25% { transform: translate(20px, -20px) scale(1.1); }
                    50% { transform: translate(-20px, 20px) scale(0.9); }
                    75% { transform: translate(20px, 20px) scale(1.05); }
                }

                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-10px); }
                    75% { transform: translateX(10px); }
                }

                .animate-fade-in-up {
                    animation: fadeInUp 1s ease-out forwards;
                }

                .animate-fade-in-left {
                    animation: fadeInLeft 0.8s ease-out forwards;
                }

                .animate-fade-in-right {
                    animation: fadeInRight 0.8s ease-out forwards;
                }

                .animate-slide-in {
                    animation: slideIn 0.6s ease-out forwards;
                }

                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }

                .animate-blob {
                    animation: blob 7s ease-in-out infinite;
                }

                .animate-shake {
                    animation: shake 0.5s ease-in-out;
                }

                .animation-delay-200 {
                    animation-delay: 200ms;
                }

                .animation-delay-300 {
                    animation-delay: 300ms;
                }

                .animation-delay-400 {
                    animation-delay: 400ms;
                }

                .animation-delay-500 {
                    animation-delay: 500ms;
                }

                .animation-delay-700 {
                    animation-delay: 700ms;
                }

                .animation-delay-2000 {
                    animation-delay: 2s;
                }

                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
};

export default Home;