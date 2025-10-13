import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button, Spin, message } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
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
                membershipActive: profile?.membershipActive === "Active" ? "Active" : "Inactive",
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
                    membershipActive: data.membershipActive === "Active" ? "Active" : "Inactive",
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

    useEffect(() => {
        if (user?.token) fetchProfile();
        setIsMounted(true);
        return () => setIsMounted(false);
    }, [user]);

    if (loading || !profileData) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-orange-100 p-3 sm:p-4">
                <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-xl w-full max-w-xs sm:max-w-sm">
                    <div className="flex flex-col items-center justify-center">
                        <Spin size="large" />
                        <p className="mt-5 text-gray-600 text-sm sm:text-lg font-medium animate-pulse text-center">
                            Fetching your profile...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const isActive = profileData.membershipActive === "Active";

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-orange-100 flex items-center justify-center p-2 sm:p-6 lg:p-8">
            <div
                className={`w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all duration-700 hover:shadow-2xl ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
            >
                {/* Top gradient bar */}
                <div className="h-2 bg-gradient-to-r from-blue-400 via-purple-500 to-orange-400 animate-gradient-x"></div>

                <div className="p-5 sm:p-8 flex flex-col justify-center">
                    {/* Header */}
                    <div className="text-center mb-5 sm:mb-8">
                        <div className="relative inline-block mb-4">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full p-4 sm:p-5 inline-flex items-center justify-center shadow-lg animate-bounce-slow">
                                <UserOutlined className="text-2xl sm:text-4xl" />
                            </div>
                        </div>
                        <h1 className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-purple-600 mb-1 sm:mb-2">
                            Your Profile
                        </h1>
                        <p className="text-gray-500 text-xs sm:text-base bg-blue-50 rounded-full py-1.5 sm:py-2 px-3 sm:px-4 inline-block">
                            All your essential details at a glance
                        </p>
                    </div>

                    {/* Membership Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center mb-4 sm:mb-6">
                        <Button
                            loading={actionLoading}
                            disabled={isActive}
                            type="primary"
                            className="!h-10 sm:!h-12 !rounded-2xl !px-4 sm:!px-6 !font-semibold !text-white shadow-lg w-full sm:w-auto text-sm sm:text-base"
                            style={{
                                background: "linear-gradient(135deg, #16a34a, #22c55e, #4ade80)",
                                boxShadow: "0 0 20px rgba(34, 197, 94, 0.6)",
                            }}
                            onClick={() => handleMembershipAction("activate")}
                        >
                            Activate
                        </Button>
                        <Button
                            loading={actionLoading}
                            disabled={!isActive}
                            type="primary"
                            className="!h-10 sm:!h-12 !rounded-2xl !px-4 sm:!px-6 !font-semibold !text-white shadow-lg w-full sm:w-auto text-sm sm:text-base"
                            style={{
                                background: "linear-gradient(135deg, #ef4444, #dc2626, #b91c1c)",
                                boxShadow: "0 0 20px rgba(239, 68, 68, 0.6)",
                            }}
                            onClick={() => handleMembershipAction("deactivate")}
                        >
                            Deactivate
                        </Button>
                    </div>

                    {/* Membership Status */}
                    <p className="text-center text-sm sm:text-lg font-semibold py-2 text-gray-700 mb-4 sm:mb-6">
                        Membership Status:{" "}
                        <span className={`font-bold ${isActive ? "text-green-600" : "text-red-600"}`}>
                            {profileData.membershipActive}
                        </span>
                    </p>

                    {/* Profile Info */}
                    <div className="space-y-3 sm:space-y-6">
                        <div className="p-3 sm:p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 border border-blue-200 shadow-sm">
                            <UserOutlined className="text-lg sm:text-2xl text-blue-600 mx-auto sm:mx-0" />
                            <div className="flex-1 text-center sm:text-left">
                                <p className="text-xs text-blue-500 uppercase tracking-wider">
                                    Full Name
                                </p>
                                <p className="text-sm sm:text-lg font-semibold text-gray-800 break-words">
                                    {profileData.name}
                                </p>
                            </div>
                        </div>

                        <div className="p-3 sm:p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 border border-blue-200 shadow-sm">
                            <MailOutlined className="text-lg sm:text-2xl text-blue-600 mx-auto sm:mx-0" />
                            <div className="flex-1 text-center sm:text-left">
                                <p className="text-xs text-blue-500 uppercase tracking-wider">
                                    Email Address
                                </p>
                                <p className="text-sm sm:text-lg font-semibold text-gray-800 break-words">
                                    {profileData.email}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom gradient bar */}
                <div className="h-2 bg-gradient-to-r from-blue-400 via-purple-500 to-orange-400 animate-gradient-x"></div>
            </div>

            {/* Animations */}
            <style jsx="true">{`
                @keyframes gradient-x {
                    0%, 100% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                }
                .animate-gradient-x {
                    background-size: 200% auto;
                    animation: gradient-x 3s ease infinite;
                }
                @keyframes bounce-slow {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default Profile;
