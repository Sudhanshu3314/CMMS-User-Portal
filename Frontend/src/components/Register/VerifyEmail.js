import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { message } from "antd";

const VerifyEmail = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const verify = async () => {
            try {
                const res = await fetch(`${process.env.BACKEND_URL}/auth/verify-email/${token}`);
                const data = await res.json();
                if (data.success) {
                    message.success("Email verified successfully! You can now login.");
                    navigate("/login");
                } else {
                    message.error(data.message || "Verification failed.");
                }
            } catch (err) {
                message.error("Something went wrong.");
            }
        };

        verify();
    }, [token]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-100 via-green-100 to-white px-4">
            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl max-w-md w-full text-center border border-emerald-200">
                <div className="mb-6">
                    <svg
                        className="mx-auto h-16 w-16 text-emerald-500 animate-pulse"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                        />
                    </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-3">
                    Verifying your email...
                </h2>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    Please wait while we confirm your email address.
                    <br className="hidden sm:block" />
                    This will only take a few seconds.
                </p>
                <div className="mt-6 text-xs text-gray-400">
                    You will be redirected after verification.
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
