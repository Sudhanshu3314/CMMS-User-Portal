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
                <div className="mb-6 bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-amber-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-400"></div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-2 text-center">
                        <span className="text-amber-500">📅</span>
                        <p className="text-xl sm:text-2xl font-bold text-amber-800 break-words">
                            {formattedDate}
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                        <span className="text-amber-500">⏰</span>
                        <p className="text-amber-600 text-sm sm:text-base">
                            Closes at {formattedDate}, 9:00 AM
                        </p>
                    </div>
                </div>

                {attendance?.status && attendance.status !== "no response" ? (
                    <div className="bg-green-50 rounded-xl p-4 sm:p-6 border border-green-200 animate-fade-in-up">
                        <div className="flex flex-col items-center justify-center space-y-2 mb-3">
                            <p className="text-base sm:text-lg font-medium text-green-800 text-center">
                                Your response for {formattedDate} has been recorded
                            </p>
                        </div>
                        <p className="text-green-700 text-sm sm:text-base">
                            You opted for:{" "}
                            <Tag
                                color={attendance.status === "yes" ? "green" : "red"}
                                className="text-base sm:text-lg px-3 py-1"
                            >
                                {attendance.status === "yes"
                                    ? "Having Lunch"
                                    : "Skipping Lunch"}
                            </Tag>
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 animate-fade-in-up">
                            <div className="flex flex-col items-center justify-center space-y-1">
                                <span className="text-amber-500 text-xl">⚠️</span>
                                <h3 className="text-base sm:text-lg font-bold text-amber-700">
                                    Time to decide!
                                </h3>
                            </div>
                            <p className="text-amber-600 mt-2 text-sm sm:text-base">
                                Will you be joining us for lunch on <br /> <b>{formattedDate}</b>?
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Button
                                className="!h-20 sm:!h-24 !w-full sm:!w-56 !py-4 !px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white border-0 shadow-lg 
                                hover:shadow-xl transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex flex-col items-center justify-center animate-fade-in-left group relative overflow-hidden text-center"
                                onClick={() => submitAttendance("yes")}
                                loading={loading}
                            >
                                <span className="text-2xl sm:text-3xl mb-2 transition-transform duration-300 group-hover:scale-110">
                                    🍽️
                                </span>
                                <span className="font-bold text-sm sm:text-lg transition-all duration-300">
                                    Yes, I'm hungry!
                                </span>
                            </Button>

                            <Button
                                className="!h-20 sm:!h-24 !w-full sm:!w-56 !py-4 !px-6 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 text-white border-0 shadow-lg 
                                hover:shadow-xl transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex flex-col items-center justify-center animate-fade-in-right group relative overflow-hidden text-center"
                                onClick={() => submitAttendance("no")}
                                loading={loading}
                            >
                                <span className="text-2xl sm:text-3xl mb-2 transition-transform duration-300 group-hover:scale-110">
                                    🚫
                                </span>
                                <span className="font-bold text-sm sm:text-lg transition-all duration-300">
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
            <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 p-4">
                <Spin size="large" />
                <p className="mt-4 text-amber-700 text-base sm:text-lg font-medium animate-pulse text-center">
                    Loading your Lunch attendance...
                </p>
            </div>
        );
    }

    const selectedDate = showNextDay ? nextDate : targetDate;

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div
                className={`w-full max-w-md sm:max-w-lg mx-auto bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all duration-700 hover:shadow-2xl ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
            >
                {/* Header */}
                <div className="h-14 sm:h-16 bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 flex">
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className="h-full w-12 sm:w-16 bg-white opacity-10"
                                style={{ transform: `skewX(${i * 5}deg)` }}
                            ></div>
                        ))}
                    </div>
                    <div className="relative z-10 flex items-center space-x-2 sm:space-x-4">
                        <div className="text-3xl sm:text-4xl animate-bounce">🍱</div>
                        <h1 className="text-lg sm:text-2xl font-bold text-white">
                            Lunch Attendance
                        </h1>
                        <div
                            className="text-3xl sm:text-4xl animate-bounce"
                            style={{ animationDelay: "0.5s" }}
                        >
                            🥗
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="px-4 sm:px-8 pt-6 sm:pt-8 bg-gradient-to-b from-amber-50 to-white">
                    {profile && (
                        <div className="space-y-4 mb-8">
                            <div className="bg-white rounded-xl p-4 shadow-sm border border-amber-100 flex items-center space-x-3 sm:space-x-4 animate-fade-in-left">
                                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                                    <UserOutlined className="text-lg sm:text-xl" />
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm text-amber-600 uppercase tracking-wider font-bold">
                                        Full Name
                                    </p>
                                    <p className="font-medium text-gray-800 text-sm sm:text-base break-words">
                                        {profile.name}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-4 shadow-sm border border-amber-100 flex items-center space-x-3 sm:space-x-4 animate-fade-in-left">
                                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                                    <MailOutlined className="text-lg sm:text-xl" />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-xs sm:text-sm text-amber-600 uppercase tracking-wider font-bold">
                                        Email Address
                                    </p>
                                    <p className="font-medium text-gray-800 text-sm sm:text-base truncate">
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
                    <div className="flex justify-center mt-10">
                        <motion.button
                            whileHover={{
                                scale: 1.08,
                                boxShadow: "0px 0px 20px rgba(255, 165, 0, 0.5)",
                            }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            onClick={() => setShowNextDay((prev) => !prev)}
                            className="relative flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-2 sm:py-3 rounded-2xl text-white font-semibold overflow-hidden shadow-lg bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 focus:outline-none text-sm sm:text-lg"
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
                                    <ArrowLeftOutlined className="text-lg sm:text-2xl" />
                                    <span className="relative z-10 font-bold">
                                        Previous Day
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span className="relative z-10 font-bold">Next Day</span>
                                    <ArrowRightOutlined className="text-lg sm:text-2xl" />
                                </>
                            )}
                        </motion.button>
                    </div>
                </div>

                {/* Footer */}
                <div className="h-14 sm:h-16 bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center relative overflow-hidden mt-8">
                    <div className="absolute inset-0 flex">
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className="h-full w-12 sm:w-16 bg-white opacity-10"
                                style={{ transform: `skewX(${i * 5}deg)` }}
                            ></div>
                        ))}
                    </div>
                    <div className="relative z-10 flex items-center space-x-1 sm:space-x-2">
                        <span className="text-white text-xl sm:text-2xl animate-pulse">
                            🍱
                        </span>
                        <span
                            className="text-white text-xl sm:text-2xl animate-pulse"
                            style={{ animationDelay: "0.3s" }}
                        >
                            🥗
                        </span>
                        <span
                            className="text-white text-xl sm:text-2xl animate-pulse"
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
