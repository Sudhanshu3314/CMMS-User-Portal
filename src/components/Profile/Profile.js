import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button, Spin, message, Upload, Tooltip } from "antd";
import { UserOutlined, MailOutlined, CameraOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const handleUnauthorized = () => {
        message.error("Session expired. Please log in again.");
        logout?.();
        navigate("/login");
    };

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.BACKEND_URL}/auth/profile`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });

            if (res.status === 401) return handleUnauthorized();

            const data = await res.json();
            const profile = data?.profile || data;

            setProfileData({
                name: profile?.name || "",
                email: profile?.email || "",
                photo: profile?.profilePhoto || "",
                membershipActive:
                    profile?.membershipActive === "Active" ? "Active" : "Inactive",
            });
        } catch (err) {
            console.error("Error fetching profile:", err);
            message.error("Error fetching profile data");
        } finally {
            setLoading(false);
        }
    };

    const handleMembershipAction = async (action) => {
        if (!profileData) return;
        setActionLoading(true);

        try {
            const res = await fetch(`${process.env.BACKEND_URL}/user/togglemembership`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({ action }),
            });

            if (res.status === 401) return handleUnauthorized();

            const data = await res.json();
            if (data.success) {
                message.success(data.message);
                setProfileData((prev) => ({
                    ...prev,
                    membershipActive:
                        data.membershipActive === "Active" ? "Active" : "Inactive",
                }));
            } else {
                message.error(data.message || "Unable to perform action");
            }
        } catch (err) {
            console.error(err);
            message.error("Error performing membership action");
        } finally {
            setActionLoading(false);
        }
    };

    const handlePhotoUpload = async (file) => {
        const formData = new FormData();
        formData.append("photo", file);

        try {
            setUploading(true);
            const res = await fetch(`${process.env.BACKEND_URL}/user/uploadphoto`, {
                method: "POST",
                headers: { Authorization: `Bearer ${user.token}` },
                body: formData,
            });

            if (res.status === 401) return handleUnauthorized();

            const data = await res.json();
            if (data.success) {
                message.success("Profile photo updated!");
                setProfileData((prev) => ({ ...prev, photo: data.photoUrl }));
            } else {
                message.error(data.message || "Upload failed");
            }
        } catch (err) {
            console.error("Upload error:", err);
            message.error("Error uploading photo");
        } finally {
            setUploading(false);
        }
    };

    useEffect(() => {
        if (user?.token) fetchProfile();
        setIsMounted(true);
        return () => setIsMounted(false);
    }, [user]);

    const isWithinDisabledTime = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const currentTime = hours * 60 + minutes;

        const morningStart = 9 * 60;
        const morningEnd = 14 * 60;
        const eveningStart = 16 * 60 + 30;
        const eveningEnd = 22 * 60;

        return (
            (currentTime >= morningStart && currentTime <= morningEnd) ||
            (currentTime >= eveningStart && currentTime <= eveningEnd)
        );
    };

    const [isTimeDisabled, setIsTimeDisabled] = useState(isWithinDisabledTime());

    useEffect(() => {
        const interval = setInterval(() => {
            setIsTimeDisabled(isWithinDisabledTime());
        }, 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    if (loading || !profileData) {
        return (
            <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden px-3 sm:px-4 md:px-6">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
                    <motion.div
                        className="absolute top-[10%] right-[5%] sm:right-[10%] w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-gradient-to-br from-blue-400/30 via-cyan-400/20 to-transparent rounded-full blur-3xl"
                        animate={{
                            x: [0, 50, -30, 0],
                            y: [0, -40, 20, 0],
                            scale: [1, 1.2, 0.9, 1],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.div
                        className="absolute bottom-[15%] left-[5%] sm:left-[15%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-gradient-to-tr from-teal-400/30 via-emerald-400/20 to-transparent rounded-full blur-3xl"
                        animate={{
                            x: [0, -40, 30, 0],
                            y: [0, 50, -20, 0],
                            scale: [1, 0.9, 1.3, 1],
                        }}
                        transition={{
                            duration: 18,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative bg-white/85 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl border border-white/60 w-full max-w-xs sm:max-w-md z-10"
                >
                    <div className="flex flex-col items-center justify-center">
                        <motion.div
                            animate={{
                                rotate: 360,
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            <Spin size="large" />
                        </motion.div>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mt-4 sm:mt-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-sm sm:text-base md:text-lg font-bold text-center"
                        >
                            Loading your profile...
                        </motion.p>
                    </div>
                </motion.div>
            </div>
        );
    }

    const isActive = profileData.membershipActive === "Active";

    return (
        <div className="relative min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
                <motion.div
                    className="absolute top-[5%] right-[5%] sm:right-[10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-gradient-to-br from-blue-400/30 via-cyan-400/20 to-transparent rounded-full blur-3xl"
                    animate={{
                        x: [0, 60, -30, 0],
                        y: [0, -50, 30, 0],
                        scale: [1, 1.2, 0.9, 1],
                        rotate: [0, 90, 180, 360],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute bottom-[10%] left-[5%] sm:left-[10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gradient-to-tr from-teal-400/30 via-emerald-400/20 to-transparent rounded-full blur-3xl"
                    animate={{
                        x: [0, -50, 40, 0],
                        y: [0, 60, -30, 0],
                        scale: [1, 0.9, 1.3, 1],
                        rotate: [360, 270, 90, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute top-[40%] left-[40%] sm:left-[50%] w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-gradient-to-bl from-cyan-300/25 via-sky-300/15 to-transparent rounded-full blur-3xl"
                    animate={{
                        x: [0, 40, -30, 0],
                        y: [0, -40, 50, 0],
                        scale: [1, 1.15, 0.95, 1],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Floating particles */}
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 sm:w-1.5 h-1 sm:h-1.5 bg-cyan-400/50 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -40, 0],
                            opacity: [0.2, 0.8, 0.2],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 3,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            {/* Main Profile Card */}
            <motion.div
                initial={{ opacity: 0, y: 40, rotateX: 10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                }}
                className="relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl z-10"
            >
                {/* Glow effect behind card */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-teal-500/20 rounded-2xl sm:rounded-3xl blur-2xl"
                    animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.5, 0.7, 0.5],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                <div className="relative bg-white/85 backdrop-blur-2xl shadow-[0_15px_60px_rgba(14,165,233,0.25)] sm:shadow-[0_20px_70px_rgba(14,165,233,0.3)] border border-white/80 rounded-2xl sm:rounded-3xl overflow-hidden group">
                    {/* Top gradient bar */}
                    <motion.div
                        className="h-1.5 sm:h-2 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500"
                        animate={{
                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{ backgroundSize: '200% auto' }}
                    />

                    {/* Shimmer effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        initial={{ x: '-100%' }}
                        animate={{ x: '200%' }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatDelay: 5,
                            ease: "easeInOut"
                        }}
                    />

                    <div className="p-4 sm:p-6 md:p-8 lg:p-10 relative z-10">
                        {/* Profile Photo Section */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-center mb-5 sm:mb-6 md:mb-8"
                        >
                            <div className="relative inline-block mb-4 sm:mb-5 md:mb-6 group/photo">
                                <Upload
                                    showUploadList={false}
                                    beforeUpload={(file) => {
                                        const isLt1M = file.size / 1024 / 1024 < 1;
                                        if (!isLt1M) {
                                            message.error("File must be smaller than 1MB!");
                                            return Upload.LIST_IGNORE;
                                        }
                                        handlePhotoUpload(file);
                                        return false;
                                    }}
                                >
                                    <motion.div
                                        className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 mx-auto cursor-pointer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {/* Animated gradient border */}
                                        <motion.div
                                            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 p-1"
                                            animate={{
                                                rotate: [7,-7,7],
                                            }}
                                            transition={{
                                                duration: 4,
                                                repeat: Infinity,
                                                ease: "linear",
                                            }}
                                        >
                                            <div className="w-full h-full bg-white rounded-full p-0.5 sm:p-1">
                                                {profileData.photo ? (
                                                    <img
                                                        src={profileData.photo}
                                                        alt="Profile"
                                                        className="w-full h-full object-cover rounded-full"
                                                    />
                                                ) : (
                                                    <div className="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 text-white rounded-full w-full h-full flex items-center justify-center shadow-lg">
                                                        <UserOutlined className="text-3xl sm:text-4xl md:text-5xl" />
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>

                                        {/* Camera button */}
                                        <motion.div
                                            className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <Button
                                                loading={uploading}
                                                icon={<CameraOutlined className="text-xs sm:text-sm" />}
                                                className="!rounded-full !bg-gradient-to-r !from-blue-500 !to-cyan-500 !border-0 !shadow-lg hover:!shadow-xl !text-white !w-8 !h-8 sm:!w-9 sm:!h-9 md:!w-10 md:!h-10 !flex !items-center !justify-center !p-0"
                                                size="small"
                                            />
                                        </motion.div>
                                    </motion.div>
                                </Upload>
                            </div>

                            <motion.h1
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent"
                            >
                                Your Profile
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="text-xs sm:text-sm md:text-base text-slate-600 px-2"
                            >
                                Manage your membership and details
                            </motion.p>
                        </motion.div>

                        {/* Membership Status Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="mb-4 sm:mb-5 md:mb-6"
                        >
                            <div className={`relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 ${isActive
                                    ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200'
                                    : 'bg-gradient-to-br from-rose-50 to-red-50 border-2 border-rose-200'
                                }`}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.2, 1],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                            }}
                                        >
                                            {isActive ? (
                                                <CheckCircleOutlined className="text-2xl sm:text-3xl text-emerald-600" />
                                            ) : (
                                                <CloseCircleOutlined className="text-2xl sm:text-3xl text-rose-600" />
                                            )}
                                        </motion.div>
                                        <div>
                                            <p className="text-[10px] sm:text-xs text-slate-600 uppercase tracking-wider font-semibold">
                                                Membership Status
                                            </p>
                                            <p className={`text-base sm:text-lg md:text-xl font-bold ${isActive ? 'text-emerald-700' : 'text-rose-700'
                                                }`}>
                                                {profileData.membershipActive}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-5 md:mb-6"
                        >
                            <Tooltip
                                title={
                                    isTimeDisabled
                                        ? "Membership changes are disabled between 9:00 am to 2:00 pm and 4:30 pm to 10:00 pm"
                                        : isActive
                                            ? "Membership is already active"
                                            : ""
                                }
                            >
                                <motion.div
                                    whileHover={{ scale: isActive || isTimeDisabled ? 1 : 1.02 }}
                                    whileTap={{ scale: isActive || isTimeDisabled ? 1 : 0.98 }}
                                >
                                    <Button
                                        loading={actionLoading}
                                        disabled={isActive || isTimeDisabled}
                                        block
                                        className="!h-11 sm:!h-12 md:!h-14 !rounded-xl sm:!rounded-2xl !font-bold !text-sm sm:!text-base md:!text-lg !border-0 !shadow-md hover:!shadow-lg !transition-all !duration-300 relative overflow-hidden"
                                        style={{
                                            background: isActive || isTimeDisabled
                                                ? '#e5e7eb'
                                                : 'linear-gradient(135deg, #10b981, #14b8a6)',
                                            color: isActive || isTimeDisabled ? '#9ca3af' : 'white',
                                        }}
                                        onClick={() => handleMembershipAction("activate")}
                                    >
                                        <motion.span
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                            initial={{ x: '-100%' }}
                                            whileHover={{ x: '100%' }}
                                            transition={{ duration: 0.6 }}
                                        />
                                        <span className="relative z-10">Activate</span>
                                    </Button>
                                </motion.div>
                            </Tooltip>

                            <Tooltip
                                title={
                                    isTimeDisabled
                                        ? "Membership changes are disabled between 9:00 am to 2:00 pm and 4:30 pm to 10:00 pm"
                                        : !isActive
                                            ? "Membership is already inactive"
                                            : ""
                                }
                            >
                                <motion.div
                                    whileHover={{ scale: !isActive || isTimeDisabled ? 1 : 1.02 }}
                                    whileTap={{ scale: !isActive || isTimeDisabled ? 1 : 0.98 }}
                                >
                                    <Button
                                        loading={actionLoading}
                                        disabled={!isActive || isTimeDisabled}
                                        block
                                        className="!h-11 sm:!h-12 md:!h-14 !rounded-xl sm:!rounded-2xl !font-bold !text-sm sm:!text-base md:!text-lg !border-0 !shadow-md hover:!shadow-lg !transition-all !duration-300 relative overflow-hidden"
                                        style={{
                                            background: !isActive || isTimeDisabled
                                                ? '#e5e7eb'
                                                : 'linear-gradient(135deg, #ef4444, #f97316)',
                                            color: !isActive || isTimeDisabled ? '#9ca3af' : 'white',
                                        }}
                                        onClick={() => handleMembershipAction("deactivate")}
                                    >
                                        <motion.span
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                            initial={{ x: '-100%' }}
                                            whileHover={{ x: '100%' }}
                                            transition={{ duration: 0.6 }}
                                        />
                                        <span className="relative z-10">Deactivate</span>
                                    </Button>
                                </motion.div>
                            </Tooltip>
                        </motion.div>

                        {/* Profile Information Cards */}
                        <div className="space-y-3 sm:space-y-4">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.7, duration: 0.5 }}
                                className="group/card"
                            >
                                <div className="relative overflow-hidden p-3.5 sm:p-4 md:p-5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl sm:rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300">
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <motion.div
                                            className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg flex-shrink-0"
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            <UserOutlined className="text-white text-base sm:text-lg md:text-xl" />
                                        </motion.div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[10px] sm:text-xs text-blue-600 uppercase tracking-wider font-semibold mb-0.5 sm:mb-1">
                                                Full Name
                                            </p>
                                            <p className="text-sm sm:text-base md:text-lg font-bold text-gray-800 truncate">
                                                {profileData.name}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8, duration: 0.5 }}
                                className="group/card"
                            >
                                <div className="relative overflow-hidden p-3.5 sm:p-4 md:p-5 bg-gradient-to-r from-cyan-50 to-teal-50 rounded-xl sm:rounded-2xl border border-cyan-100 shadow-sm hover:shadow-md transition-all duration-300">
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <motion.div
                                            className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center shadow-lg flex-shrink-0"
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            <MailOutlined className="text-white text-base sm:text-lg md:text-xl" />
                                        </motion.div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[10px] sm:text-xs text-cyan-600 uppercase tracking-wider font-semibold mb-0.5 sm:mb-1">
                                                Email Address
                                            </p>
                                            <p className="text-xs sm:text-sm md:text-base font-bold text-gray-800 break-all">
                                                {profileData.email}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Bottom gradient bar */}
                    <motion.div
                        className="h-1.5 sm:h-2 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500"
                        animate={{
                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{ backgroundSize: '200% auto' }}
                    />
                </div>

                {/* Bottom glow */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                    className="absolute -bottom-6 sm:-bottom-8 left-1/2 -translate-x-1/2 w-3/4 sm:w-4/5 h-6 sm:h-8 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent blur-2xl rounded-full"
                />
            </motion.div>
        </div>
    );
};

export default Profile;