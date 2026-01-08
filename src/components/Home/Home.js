import React, { useEffect, useState } from 'react';
import { FaUtensils, FaMoon, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 font-inter text-gray-800 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <header className="text-center mb-8 sm:mb-12 animate-fade-in">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-800 drop-shadow-lg">
                        🍽️ IGIDR Canteen Menu
                    </h1>

                    <p className="mt-3 text-sm sm:text-base md:text-lg text-gray-700 font-medium">
                        Your delicious meal selection for{' '}
                        <span className="text-purple-700 font-bold">
                            {day}, {formattedDate}
                        </span>
                    </p>

                    {/* Day Navigation */}
                    <div className="flex justify-center items-center gap-6 mt-6">
                        {/* Previous Button */}
                        <button
                            onClick={goToPreviousDay}
                            className="
                                        flex items-center gap-3
                                        px-6 py-3
                                        rounded-full
                                        bg-gradient-to-r from-blue-500 to-indigo-600
                                        text-white font-semibold
                                        shadow-lg shadow-blue-300/40
                                        hover:from-blue-600 hover:to-indigo-700
                                        hover:shadow-xl hover:shadow-blue-400/50
                                        active:scale-95
                                        transition-all duration-300 ease-out
                                    "
                        >
                            <FaChevronLeft className="text-lg" />
                            <span>Previous Day</span>
                        </button>

                        {/* Next Button */}
                        <button
                            onClick={goToNextDay}
                            className="
                                        flex items-center gap-3
                                        px-6 py-3
                                        rounded-full
                                        bg-gradient-to-r from-purple-500 to-pink-600
                                        text-white font-semibold
                                        shadow-lg shadow-purple-300/40
                                        hover:from-purple-600 hover:to-pink-700
                                        hover:shadow-xl hover:shadow-purple-400/50
                                        active:scale-95
                                        transition-all duration-300 ease-out
                                    "
                        >
                            <span>Next Day</span>
                            <FaChevronRight className="text-lg" />
                        </button>
                    </div>

                </header>

                {/* Loading / Error */}
                {loading && (
                    <div className="text-center text-lg font-semibold">
                        Loading menu 🍽️...
                    </div>
                )}

                {error && (
                    <div className="text-center text-red-600 font-semibold">
                        Failed to load menu
                    </div>
                )}

                {/* Menu Cards */}
                {!loading && !error && menu && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-12">

                        {/* Lunch */}
                        <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 p-4 sm:p-6 md:p-10 border border-blue-100 bg-gradient-to-b from-[rgba(18,219,0,0.1)] via-white to-[rgba(18,219,0,0.1)]">
                            <div className="flex items-center mb-4">
                                <FaUtensils className="text-teal-600 text-3xl mr-3 animate-bounce-in" />
                                <h2 className="text-2xl font-bold text-teal-800">
                                    Lunch Delights
                                </h2>
                            </div>

                            <ul className="space-y-3">
                                {menu.lunch?.map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                                    >
                                        <span className="text-teal-500 text-xl mr-3">•</span>
                                        <span className="font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Dinner */}
                        <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 p-4 sm:p-6 md:p-10 border border-pink-100 bg-gradient-to-b from-[rgba(219,0,172,0.1)] via-white to-[rgba(219,0,172,0.1)]">
                            <div className="flex items-center mb-4">
                                <FaMoon className="text-purple-600 text-3xl mr-3 animate-bounce-in" />
                                <h2 className="text-2xl font-bold text-purple-800">
                                    Dinner Specials
                                </h2>
                            </div>

                            <ul className="space-y-3">
                                {menu.dinner?.map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center p-3 bg-pink-50 rounded-lg hover:bg-pink-100 transition"
                                    >
                                        <span className="text-purple-500 text-xl mr-3">•</span>
                                        <span className="font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>

            {/* Custom Animations */}
            <style jsx="true">{`
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
            `}</style>
        </div>
    );
};

export default Home;
