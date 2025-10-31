import React, { useState, useEffect } from "react";
import { message, Button, Spin, Tag } from "antd";
import { UserOutlined, MailOutlined, ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

dayjs.extend(utc);
dayjs.extend(timezone);

const Dinner = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [attendance, setAttendance] = useState(null);
    const [profile, setProfile] = useState(null);
    const [targetDate, setTargetDate] = useState("");
    const [nextDate, setNextDate] = useState("");
    const [isMounted, setIsMounted] = useState(false);
    const [showNextDay, setShowNextDay] = useState(false);

    // Determine target date based on 4:30 PM cutoff
    useEffect(() => {
        const updateDateAndCutoff = () => {
            let now = dayjs().tz("Asia/Kolkata");
            let dateForAttendance =
                now.hour() > 16 || (now.hour() === 16 && now.minute() >= 30)
                    ? now.add(1, "day")
                    : now;
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

    const handleTokenError = () => {
        message.error("Session expired. Please login again.");
        logout?.();
        navigate("/login");
    };

    // Fetch profile and attendance
    useEffect(() => {
        if (!user?.token || !targetDate) return;

        const fetchAllData = async () => {
            setLoading(true);
            try {
                const resProfile = await fetch(`${process.env.BACKEND_URL}/auth/profile`, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                const profileData = await resProfile.json();

                if (profileData.success) {
                    setProfile(profileData.profile);
                } else {
                    if (profileData.message?.toLowerCase().includes("token")) {
                        handleTokenError();
                        return;
                    }
                    message.error(profileData.message);
                }

                await fetchAttendance();
            } catch (err) {
                console.error(err);
                message.error("Error loading dinner data.");
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, [user, targetDate, showNextDay]);

    const fetchAttendance = async () => {
        if (!user?.token) return;
        try {
            const selectedDate = showNextDay ? nextDate : targetDate;
            const res = await fetch(`${process.env.BACKEND_URL}/dinner?date=${selectedDate}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            const data = await res.json();

            if (data.message?.toLowerCase().includes("token")) {
                handleTokenError();
                return;
            }

            setAttendance(data || {});
        } catch (err) {
            console.error(err);
            message.error("Error loading dinner attendance.");
        }
    };

    const submitAttendance = async (status) => {
        try {
            setLoading(true);
            const selectedDate = showNextDay ? nextDate : targetDate;
            const res = await fetch(`${process.env.BACKEND_URL}/dinner`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({ status, date: selectedDate }),
            });
            const data = await res.json();

            if (data.message?.toLowerCase().includes("token")) {
                handleTokenError();
                return;
            }

            if (data.success) {
                message.success(data.message);
                await fetchAttendance();
            } else {
                message.error(data.message);
            }
        } catch (err) {
            console.error(err);
            message.error("Error submitting dinner attendance.");
        } finally {
            setLoading(false);
        }
    };

    const AttendanceSection = ({ date, attendance }) => {
        const formattedDate = dayjs(date).format("dddd, MMMM D YYYY");
        return (
            <div className="text-center">
                <div className="mb-6 bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-indigo-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-purple-400"></div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-2">
                        <span className="text-indigo-500 text-xl sm:text-2xl">📅</span>
                        <p className="text-lg sm:text-2xl font-bold text-indigo-800 break-words">
                            {formattedDate}
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base">
                        <span className="text-indigo-500 text-lg sm:text-xl">⏰</span>
                        <p className="text-indigo-600">Closes at {formattedDate}, 4:30 PM</p>
                    </div>
                </div>

                {attendance?.status && attendance.status !== "no response" ? (
                    <div className="bg-green-50 rounded-xl p-4 sm:p-6 border border-green-200 animate-fade-in-up">
                        <p className="text-green-700 text-base sm:text-lg font-medium">
                            Your response for {formattedDate} has been recorded
                        </p>
                        <p className="text-green-700 mt-2">
                            You chose:{" "}
                            <Tag color={attendance.status === "yes" ? "green" : "red"} className="text-sm sm:text-base px-3 py-1">
                                {attendance.status === "yes" ? "Having Dinner" : "Skipping Dinner"}
                            </Tag>
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="bg-indigo-50 rounded-xl p-4 sm:p-6 border border-indigo-200 animate-fade-in-up">
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                                <span className="text-indigo-500 text-xl sm:text-2xl">⚠️</span>
                                <h3 className="text-base sm:text-lg font-bold text-indigo-700">
                                    Time to decide!
                                </h3>
                            </div>
                            <p className="text-indigo-600 mt-2 text-sm sm:text-base">
                                Will you be joining us for dinner on <br />
                                <b>{formattedDate}</b>?
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Button
                                className="!h-24 !w-full sm:!w-56 !py-4 !px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white border-0 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex flex-col items-center justify-center animate-fade-in-left group"
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
                                className="!h-24 !w-full sm:!w-56 !py-4 !px-6 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 text-white border-0 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex flex-col items-center justify-center animate-fade-in-right group"
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
            <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 p-4">
                <Spin size="large" />
                <p className="mt-4 text-indigo-700 text-base sm:text-lg font-medium animate-pulse text-center">
                    Loading your Dinner attendance...
                </p>
            </div>
        );
    }

    const selectedDate = showNextDay ? nextDate : targetDate;

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 flex items-center justify-center p-3 sm:p-6 lg:p-8">
            <div className={`w-full max-w-sm sm:max-w-lg mx-auto bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all duration-700 hover:shadow-2xl ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

                {/* Header */}
                <div className="h-14 sm:h-16 bg-gradient-to-r from-indigo-600 to-purple-700 flex items-center justify-center relative overflow-hidden">
                    <div className="relative z-10 flex items-center space-x-2 sm:space-x-4">
                        <div className="text-2xl sm:text-4xl animate-bounce">🍽️</div>
                        <h1 className="text-lg sm:text-2xl font-bold text-white">Dinner Attendance</h1>
                        <div className="text-2xl sm:text-4xl animate-bounce" style={{ animationDelay: '0.5s' }}>🍷</div>
                    </div>
                </div>

                {/* Body */}
                <div className="p-4 sm:p-8 bg-gradient-to-b from-indigo-50 to-white">
                    {profile && (
                        <div className="space-y-4 mb-6 sm:mb-8">
                            <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-indigo-100 flex items-center space-x-3 sm:space-x-4 animate-fade-in-left">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                    <UserOutlined className="text-lg sm:text-xl" />
                                </div>
                                <div>
                                    <p className="text-[10px] sm:text-xs text-indigo-600 uppercase tracking-wider font-bold">Full Name</p>
                                    <p className="font-medium text-sm sm:text-base text-gray-800">{profile.name}</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-indigo-100 flex items-center space-x-3 sm:space-x-4 animate-fade-in-left">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                    <MailOutlined className="text-lg sm:text-xl" />
                                </div>
                                <div>
                                    <p className="text-[10px] sm:text-xs text-indigo-600 uppercase tracking-wider font-bold">Email Address</p>
                                    <p className="font-medium text-sm sm:text-base text-gray-800 truncate max-w-[160px] sm:max-w-none">{profile.email}</p>
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
                    <div className="flex justify-center mt-8 sm:mt-10">
                        <motion.button
                            whileHover={{ scale: 1.08, boxShadow: "0px 0px 20px rgba(128, 0, 128, 0.5)" }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            onClick={() => setShowNextDay((prev) => !prev)}
                            className="relative flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-2 sm:py-3 rounded-2xl text-white font-semibold overflow-hidden shadow-lg bg-gradient-to-r from-indigo-500 via-purple-600 to-blue-500 focus:outline-none text-sm sm:text-base"
                        >
                            {showNextDay ? (
                                <>
                                    <ArrowLeftOutlined className="text-base sm:text-2xl" />
                                    <span className="relative z-10 font-bold text-sm sm:text-xl">Previous Day</span>
                                </>
                            ) : (
                                <>
                                    <span className="relative z-10 font-bold text-sm sm:text-xl">Next Day</span>
                                    <ArrowRightOutlined className="text-base sm:text-2xl" />
                                </>
                            )}
                        </motion.button>
                    </div>
                </div>

                {/* Footer */}
                <div className="h-14 sm:h-16 bg-gradient-to-r from-indigo-600 to-purple-700 flex items-center justify-center relative overflow-hidden">
                    <div className="relative z-10 flex items-center space-x-2 sm:space-x-3">
                        <span className="text-white text-lg sm:text-2xl animate-pulse">🍲</span>
                        <span className="text-white text-lg sm:text-2xl animate-pulse" style={{ animationDelay: '0.3s' }}>🥘</span>
                        <span className="text-white text-lg sm:text-2xl animate-pulse" style={{ animationDelay: '0.6s' }}>🍝</span>
                    </div>
                </div>
            </div>

            {/* Animations */}
            <style jsx="true">{`
                @keyframes fade-in-left {
                    from { opacity: 0; transform: translateX(-20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .animate-fade-in-left { animation: fade-in-left 0.8s ease-out; }

                @keyframes fade-in-right {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .animate-fade-in-right { animation: fade-in-right 0.8s ease-out; }

                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up { animation: fade-in-up 0.8s ease-out; }
            `}</style>
        </div>
    );
};

export default Dinner;
