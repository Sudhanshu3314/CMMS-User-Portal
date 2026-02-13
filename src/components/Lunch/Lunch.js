import React, { useState, useEffect } from "react";
import { message, Button, Spin, Tag } from "antd";
import {
    UserOutlined,
    MailOutlined,
    ArrowRightOutlined,
    ArrowLeftOutlined,
} from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const Lunch = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [attendance, setAttendance] = useState(null);
    const [profile, setProfile] = useState(null);
    const [targetDate, setTargetDate] = useState("");
    const [nextDate, setNextDate] = useState("");
    const [isMounted, setIsMounted] = useState(false);
    const [showNextDay, setShowNextDay] = useState(false);

    const fetchWithAuth = async (url, options = {}) => {
        try {
            const res = await fetch(url, {
                ...options,
                headers: {
                    ...(options.headers || {}),
                    Authorization: `Bearer ${user?.token}`,
                },
            });

            if (res.status === 401) {
                message.error("Session expired. Please log in again.");
                navigate("/login");
                return null;
            }

            const data = await res.json();
            return data;
        } catch (err) {
            console.error(err);
            message.error("Network error occurred.");
            return null;
        }
    };

    useEffect(() => {
        const updateDateAndCutoff = () => {
            let now = dayjs().tz("Asia/Kolkata");
            let dateForAttendance = now.hour() >= 9 ? now.add(1, "day") : now;
            setTargetDate(dateForAttendance.format("YYYY-MM-DD"));
            setNextDate(dateForAttendance.add(1, "day").format("YYYY-MM-DD"));
        };
        updateDateAndCutoff();
        const interval = setInterval(updateDateAndCutoff, 60000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    useEffect(() => {
        if (!user?.token || !targetDate) return;

        const fetchAllData = async () => {
            setLoading(true);
            try {
                const profileData = await fetchWithAuth(`${process.env.BACKEND_URL}/auth/profile`);
                if (profileData?.success) setProfile(profileData.profile);
                else if (profileData) message.error(profileData.message);

                await fetchAttendance();
            } finally {
                setLoading(false);
            }
        };
        fetchAllData();
    }, [user, targetDate, showNextDay]);

    const fetchAttendance = async () => {
        if (!user?.token) return;
        const selectedDate = showNextDay ? nextDate : targetDate;
        const data = await fetchWithAuth(`${process.env.BACKEND_URL}/lunch?date=${selectedDate}`);
        if (data) setAttendance(data || {});
    };

    const submitAttendance = async (status) => {
        try {
            setLoading(true);
            const selectedDate = showNextDay ? nextDate : targetDate;
            const data = await fetchWithAuth(`${process.env.BACKEND_URL}/lunch`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status, date: selectedDate }),
            });
            if (data?.success) {
                message.success(data.message);
                await fetchAttendance();
            } else if (data) message.error(data.message);
        } finally {
            setLoading(false);
        }
    };

    const AttendanceSection = ({ date, attendance }) => {
        const formattedDate = dayjs(date).format("dddd, MMMM D YYYY");

        return (
            <div className="text-center">
                <div className="mb-4 sm:mb-6 bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 shadow-sm border border-amber-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-amber-400 to-orange-400"></div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 mb-1 sm:mb-2 text-center">
                        <span className="text-base sm:text-lg md:text-xl">📅</span>
                        <p className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-amber-800 break-words px-2">
                            {formattedDate}
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1 md:gap-2">
                        <span className="text-sm sm:text-base md:text-lg">⏰</span>
                        <p className="text-amber-600 text-xs sm:text-sm md:text-base lg:text-lg px-2">
                            Closes at {formattedDate}, 9:00 AM
                        </p>
                    </div>
                </div>

                {attendance?.status && attendance.status !== "no response" ? (
                    <div className="bg-green-50 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 border border-green-200 animate-fade-in-up">
                        <div className="flex flex-col items-center justify-center space-y-1 sm:space-y-2 mb-2 sm:mb-3">
                            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-green-800 text-center px-2">
                                Your response for {formattedDate} has been recorded
                            </p>
                        </div>
                        <p className="text-green-700 text-xs sm:text-sm md:text-base lg:text-lg px-2">
                            You opted for:{" "}
                            <Tag
                                color={attendance.status === "yes" ? "green" : "red"}
                                className="text-sm sm:text-base md:text-lg lg:text-xl px-2 sm:px-3 py-0.5 sm:py-1"
                            >
                                {attendance.status === "yes"
                                    ? "Having Lunch"
                                    : "Skipping Lunch"}
                            </Tag>
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4 sm:space-y-6">
                        <div className="bg-amber-50 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 border border-amber-200 animate-fade-in-up">
                            <div className="flex flex-col items-center justify-center space-y-0.5 sm:space-y-1">
                                <span className="text-lg sm:text-xl md:text-2xl">⚠️</span>
                                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-amber-700 px-2">
                                    Time to decide!
                                </h3>
                            </div>
                            <p className="text-amber-600 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base lg:text-lg px-2 text-center">
                                Will you be joining us for lunch on <br className="hidden sm:block" /> <b>{formattedDate}</b>?
                            </p>
                        </div>

                        {/* Centered "No, thanks!" button */}
                        <div className="flex justify-center px-2 sm:px-0">
                            <Button
                                className="!h-16 sm:!h-20 md:!h-24 lg:!h-28 !w-full max-w-xs !py-3 sm:!py-4 md:!py-5 !px-4 sm:!px-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 text-white border-0 shadow-lg 
                hover:shadow-xl transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex flex-col items-center justify-center animate-fade-in group relative overflow-hidden text-center"
                                onClick={() => submitAttendance("no")}
                                loading={loading}
                            >
                                <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-1 sm:mb-2 transition-transform duration-300 group-hover:scale-110">
                                    🚫
                                </span>
                                <span className="font-bold text-xs sm:text-sm md:text-lg lg:text-xl transition-all duration-300">
                                    No, thanks!
                                </span>
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 p-3 sm:p-4 md:p-6">
                <Spin size="large" />
                <p className="mt-3 sm:mt-4 text-amber-700 text-sm sm:text-base md:text-lg lg:text-xl font-medium animate-pulse text-center px-4">
                    Loading your Lunch attendance...
                </p>
            </div>
        );
    }

    const selectedDate = showNextDay ? nextDate : targetDate;

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8">
            <div
                className={`w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden transform transition-all duration-700 hover:shadow-2xl ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
            >
                {/* Header */}
                <div className="h-12 sm:h-14 md:h-16 lg:h-18 bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 flex">
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className="h-full w-8 sm:w-12 md:w-16 bg-white opacity-10"
                                style={{ transform: `skewX(${i * 5}deg)` }}
                            ></div>
                        ))}
                    </div>
                    <div className="relative z-10 flex items-center space-x-1.5 sm:space-x-2 md:space-x-4">
                        <div className="text-2xl sm:text-3xl md:text-4xl animate-bounce">🍱</div>
                        <h1 className="text-sm sm:text-lg md:text-2xl lg:text-3xl font-bold text-white">
                            Lunch Attendance
                        </h1>
                        <div
                            className="text-2xl sm:text-3xl md:text-4xl animate-bounce"
                            style={{ animationDelay: "0.5s" }}
                        >
                            🥗
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="px-3 sm:px-4 md:px-6 lg:px-8 pt-4 sm:pt-6 md:pt-8 bg-gradient-to-b from-amber-50 to-white">
                    {profile && (
                        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                            <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 shadow-sm border border-amber-100 flex items-center space-x-2 sm:space-x-3 md:space-x-4 animate-fade-in-left">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
                                    <UserOutlined className="text-sm sm:text-base md:text-lg lg:text-xl" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] sm:text-xs md:text-sm text-amber-600 uppercase tracking-wider font-bold">
                                        Full Name
                                    </p>
                                    <p className="font-medium text-gray-800 text-xs sm:text-sm md:text-base lg:text-lg break-words">
                                        {profile.name}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 shadow-sm border border-amber-100 flex items-center space-x-2 sm:space-x-3 md:space-x-4 animate-fade-in-left">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
                                    <MailOutlined className="text-sm sm:text-base md:text-lg lg:text-xl" />
                                </div>
                                <div className="flex-1 min-w-0 overflow-hidden">
                                    <p className="text-[10px] sm:text-xs md:text-sm text-amber-600 uppercase tracking-wider font-bold">
                                        Email Address
                                    </p>
                                    <p className="font-medium text-gray-800 text-xs sm:text-sm md:text-base lg:text-lg truncate">
                                        {profile.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Attendance Section */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedDate}
                            initial={{ opacity: 0, x: showNextDay ? 80 : -80 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: showNextDay ? -80 : 80 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            <AttendanceSection date={selectedDate} attendance={attendance} />
                        </motion.div>
                    </AnimatePresence>

                    {/* Toggle Button */}
                    <div className="flex justify-center mt-6 sm:mt-8 md:mt-10">
                        <motion.button
                            whileHover={{
                                scale: 1.08,
                                boxShadow: "0px 0px 20px rgba(255, 165, 0, 0.5)",
                            }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            onClick={() => setShowNextDay((prev) => !prev)}
                            className="relative flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 px-4 sm:px-6 md:px-8 py-1.5 sm:py-2 md:py-3 rounded-xl sm:rounded-2xl text-white font-semibold overflow-hidden shadow-lg bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 focus:outline-none text-xs sm:text-sm md:text-lg lg:text-xl"
                        >
                            <motion.span
                                className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-400 opacity-40"
                                animate={{
                                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                                }}
                                transition={{
                                    duration: 3,
                                    ease: "linear",
                                    repeat: Infinity,
                                }}
                                style={{ backgroundSize: "200% 200%" }}
                            />
                            {showNextDay ? (
                                <>
                                    <ArrowLeftOutlined className="text-sm sm:text-lg md:text-2xl" />
                                    <span className="relative z-10 font-bold">
                                        Previous Day
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span className="relative z-10 font-bold">Next Day</span>
                                    <ArrowRightOutlined className="text-sm sm:text-lg md:text-2xl" />
                                </>
                            )}
                        </motion.button>
                    </div>
                </div>

                {/* Footer */}
                <div className="h-12 sm:h-14 md:h-16 lg:h-18 bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center relative overflow-hidden mt-6 sm:mt-8">
                    <div className="absolute inset-0 flex">
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className="h-full w-8 sm:w-12 md:w-16 bg-white opacity-10"
                                style={{ transform: `skewX(${i * 5}deg)` }}
                            ></div>
                        ))}
                    </div>
                    <div className="relative z-10 flex items-center space-x-0.5 sm:space-x-1 md:space-x-2">
                        <span className="text-base sm:text-xl md:text-2xl lg:text-3xl animate-pulse">
                            🍱
                        </span>
                        <span
                            className="text-base sm:text-xl md:text-2xl lg:text-3xl animate-pulse"
                            style={{ animationDelay: "0.3s" }}
                        >
                            🥗
                        </span>
                        <span
                            className="text-base sm:text-xl md:text-2xl lg:text-3xl animate-pulse"
                            style={{ animationDelay: "0.6s" }}
                        >
                            🍲
                        </span>
                    </div>
                </div>
            </div>

            {/* Custom animations */}
            <style jsx="true">{`
                @keyframes fade-in-left {
                    from {
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                .animate-fade-in-left {
                    animation: fade-in-left 0.8s ease-out;
                }

                @keyframes fade-in-right {
                    from {
                        opacity: 0;
                        transform: translateX(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                .animate-fade-in-right {
                    animation: fade-in-right 0.8s ease-out;
                }

                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out;
                }
            `}</style>
        </div>
    );
};

export default Lunch;