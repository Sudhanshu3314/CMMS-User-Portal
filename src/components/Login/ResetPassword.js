import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button, Spin, message } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";

const Profile = () => {
    const { user } = useAuth();
    const [profileData, setProfileData] = useState({});
    const [loading, setLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    const handleToggleMembership = async () => {
        if (!profileData || !user) return;
        try {
            const res = await fetch(`${process.env.BACKEND_URL}/user/togglemembership`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            });
            const data = await res.json();
            if (data.success) {
                message.success(data.message);
                setProfileData(prev => ({ ...prev, membershipActive: data.membershipActive }));
            } else {
                message.error(data.message);
            }
        } catch (err) {
            console.error(err);
            message.error("Error toggling membership");
        }
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                if (!user?.token) return setLoading(false);
                const res = await fetch(`${process.env.BACKEND_URL}/auth/profile`, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                const data = await res.json();
                setProfileData(data.profile || {});
            } catch (err) {
                console.error(err);
                setProfileData({});
                message.error("Error fetching profile.");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [user]);

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-orange-100 p-4">
                <div className="bg-white rounded-2xl p-8 shadow-xl max-w-sm w-full">
                    <div className="flex flex-col items-center justify-center">
                        <div className="relative">
                            <Spin size="large" />
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-orange-400 rounded-full opacity-20 animate-ping"></div>
                        </div>
                        <p className="mt-6 text-gray-600 text-lg font-medium animate-pulse">
                            Fetching your profile...
                        </p>
                        <div className="mt-4 w-16 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-orange-400 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>
        );
    }

    const isMember = profileData?.membershipActive ?? false;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-orange-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div
                className={`w-full max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all duration-700 hover:shadow-2xl ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
            >
                <div className="h-2 bg-gradient-to-r from-blue-400 via-purple-500 to-orange-400 animate-gradient-x"></div>

                <div className="p-6 sm:p-8 bg-gradient-to-b from-[rgba(147,197,253,0.15)] via-white to-[rgba(253,224,71,0.15)]">
                    <div className="text-center mb-8 sm:mb-10">
                        <div className="relative inline-block mb-5">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full p-5 inline-flex items-center justify-center shadow-lg mb-4 sm:mb-5 transform transition-all duration-300 hover:scale-105 animate-bounce-slow">
                                <UserOutlined className="text-3xl sm:text-4xl" />
                            </div>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-purple-600 mb-2 animate-fade-in">
                            Your Profile
                        </h1>
                        <p className="text-gray-500 text-sm sm:text-base bg-blue-50 rounded-full py-2 px-4 inline-block animate-fade-in-up">
                            All your essential details at a glance
                        </p>
                    </div>

                    {/* Centered Membership Button */}
                    <div className="flex justify-center mb-6">
                        <Button
                            type="primary"
                            className="!h-12 !rounded-2xl !px-8 !font-semibold !text-white shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:scale-105 relative overflow-hidden border-0"
                            style={{
                                background: isMember
                                    ? "linear-gradient(135deg, #16a34a, #22c55e, #4ade80)" // green for deactivating
                                    : "linear-gradient(135deg, #dc2626, #ef4444, #f87171)", // red for activating
                                boxShadow: isMember
                                    ? "0 0 20px rgba(34, 197, 94, 0.6)"
                                    : "0 0 20px rgba(220, 38, 38, 0.6)",
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = isMember
                                    ? "linear-gradient(135deg, #22c55e, #4ade80, #86efac)"
                                    : "linear-gradient(135deg, #ef4444, #f87171, #fca5a5)";
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = isMember
                                    ? "linear-gradient(135deg, #16a34a, #22c55e, #4ade80)"
                                    : "linear-gradient(135deg, #dc2626, #ef4444, #f87171)";
                            }}
                            onClick={handleToggleMembership}
                        >
                            {isMember ? "Deactivate Membership" : "Activate Membership"}
                        </Button>
                    </div>

                    <div className="space-y-5 sm:space-y-6">
                        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl flex items-center gap-3 sm:gap-5 border border-blue-200 shadow-sm transition-all duration-300 hover:shadow-md hover:translate-x-1 animate-fade-in-left">
                            <div className="bg-blue-100 p-2.5 sm:p-3 rounded-full flex-shrink-0 transition-transform duration-300 hover:rotate-12">
                                <UserOutlined className="text-xl sm:text-2xl text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[0.625rem] sm:text-xs text-blue-500 uppercase tracking-wider">
                                    Full Name
                                </p>
                                <p className="text-base sm:text-lg font-semibold text-gray-800 truncate">
                                    {profileData?.name || "N/A"}
                                </p>
                            </div>
                        </div>

                        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl flex items-center gap-3 sm:gap-5 border border-blue-200 shadow-sm transition-all duration-300 hover:shadow-md hover:translate-x-1 animate-fade-in-left">
                            <div className="bg-blue-100 p-2.5 sm:p-3 rounded-full flex-shrink-0 transition-transform duration-300 hover:rotate-12">
                                <MailOutlined className="text-xl sm:text-2xl text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[0.625rem] sm:text-xs text-blue-500 uppercase tracking-wider">
                                    Email Address
                                </p>
                                <p className="text-base sm:text-lg font-semibold text-gray-800 truncate">
                                    {profileData?.email || "N/A"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-2 bg-gradient-to-r from-blue-400 via-purple-500 to-orange-400 animate-gradient-x"></div>
            </div>

            <style jsx="true">{`
                @keyframes gradient-x {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .animate-gradient-x { background-size: 200% auto; animation: gradient-x 3s ease infinite; }
                @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
                .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fade-in 1s ease-out; }
                @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in-up { animation: fade-in-up 0.8s ease-out; }
                @keyframes fade-in-left { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
                .animate-fade-in-left { animation: fade-in-left 0.8s ease-out; }
            `}</style>
        </div>
    );
};

export default Profile;
