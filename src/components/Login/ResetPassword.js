import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useParams, useNavigate, Link } from "react-router";
import { motion } from "framer-motion";

/**
 * Note: This component uses 'xs:' breakpoint which requires Tailwind config:
 * theme: {
 *   screens: {
 *     'xs': '475px',
 *     ...defaultTheme.screens,
 *   }
 * }
 * If xs: is not configured, those styles will be ignored (mobile-first still works)
 */

const { Text } = Typography;

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        const { new_password, confirm_password } = values;

        if (new_password !== confirm_password) {
            message.error("Passwords do not match!");
            return;
        }

        try {
            setLoading(true);
            const res = await fetch(`${process.env.BACKEND_URL}/auth/reset-password/${token}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ newPassword: new_password }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                message.success("Password reset successful! Please log in.");
                navigate("/login");
            } else {
                message.error(data.message || "Failed to reset password.");
            }
        } catch (err) {
            console.error("Reset error:", err);
            message.error("Server unreachable. Check internet or backend URL.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="relative flex items-center justify-center min-h-screen overflow-hidden px-3 xs:px-4 sm:px-6 md:px-8 font-poppins">
            {/* Dynamic Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-purple-50 to-teal-50">
                {/* Animated gradient mesh - responsive sizes */}
                <motion.div
                    className="absolute top-[5%] right-[15%] w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] bg-gradient-to-br from-purple-400/30 via-indigo-400/20 to-transparent rounded-full blur-2xl sm:blur-3xl"
                    animate={{
                        x: [0, 30, -10, 0],
                        y: [0, -25, 15, 0],
                        scale: [1, 1.1, 0.95, 1],
                        rotate: [0, 90, 180, 360],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute bottom-[10%] left-[10%] w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] bg-gradient-to-tr from-teal-400/30 via-cyan-400/20 to-transparent rounded-full blur-2xl sm:blur-3xl"
                    animate={{
                        x: [0, -25, 20, 0],
                        y: [0, 30, -15, 0],
                        scale: [1, 0.95, 1.15, 1],
                        rotate: [360, 270, 90, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute top-[40%] left-[40%] w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] bg-gradient-to-bl from-indigo-300/25 via-violet-300/15 to-transparent rounded-full blur-2xl sm:blur-3xl"
                    animate={{
                        x: [0, 20, -15, 0],
                        y: [0, -20, 25, 0],
                        scale: [1, 1.1, 0.95, 1],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Animated dots pattern - responsive */}
                <div className="absolute inset-0 opacity-20 sm:opacity-30">
                    <motion.div
                        className="w-full h-full"
                        style={{
                            backgroundImage: `radial-gradient(circle, rgba(99, 102, 241, 0.15) 1px, transparent 1px)`,
                            backgroundSize: '30px 30px'
                        }}
                        animate={{
                            backgroundPosition: ['0px 0px', '30px 30px'],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                </div>

                {/* Floating particles - fewer on mobile */}
                {[...Array(window.innerWidth < 640 ? 8 : 15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-purple-400/40 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.2, 0.8, 0.2],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            {/* Main Card */}
            <motion.div
                initial={{ opacity: 0, y: 20, rotateX: 5 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.1
                }}
                className="mt-4 sm:mt-8 md:mt-10 relative w-full max-w-sm sm:max-w-md md:max-w-lg z-10"
            >
                {/* Glow effect behind card */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-teal-500/20 rounded-3xl blur-2xl"
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

                <div className="relative bg-white/80 backdrop-blur-2xl shadow-[0_20px_70px_rgba(99,102,241,0.2)] border border-white/80 rounded-2xl sm:rounded-3xl p-6 xs:p-7 sm:p-8 md:p-10 transition-all duration-700 hover:shadow-[0_25px_90px_rgba(99,102,241,0.3)] mb-16 sm:mb-20 md:mb-24 lg:mb-32 group overflow-hidden">
                    {/* Shimmer effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                        initial={{ x: '-100%' }}
                        animate={{ x: '200%' }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatDelay: 5,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Corner decorations */}
                    <motion.div
                        className="absolute top-0 right-0 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-purple-400/20 to-transparent rounded-tr-2xl sm:rounded-tr-3xl" />
                        <motion.div
                            className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-2 border-purple-400/30 rounded-full"
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 180, 360],
                            }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    </motion.div>

                    <motion.div
                        className="absolute bottom-0 left-0 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-teal-400/20 to-transparent rounded-bl-2xl sm:rounded-bl-3xl" />
                        <motion.div
                            className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 md:bottom-4 md:left-4 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 border-2 border-teal-400/30 rounded-lg"
                            animate={{
                                scale: [1, 1.3, 1],
                                rotate: [0, -90, 0],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </motion.div>

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-center mb-6 sm:mb-8 md:mb-10 relative z-10"
                    >
                        <motion.div
                            className="inline-block mb-3 sm:mb-4"
                            whileHover={{
                                scale: 1.1,
                                rotate: [0, -10, 10, -10, 0],
                            }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="text-5xl sm:text-6xl md:text-7xl filter drop-shadow-lg">
                                🔐
                            </div>
                        </motion.div>

                        <motion.h1
                            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 bg-clip-text text-transparent tracking-tight px-2"
                            initial={{ backgroundPosition: '0% 50%' }}
                            animate={{ backgroundPosition: '100% 50%' }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                            style={{ backgroundSize: '200% auto' }}
                        >
                            Reset Password
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <p className="text-lg xs:text-xl sm:text-2xl font-semibold text-indigo-900 mb-1 sm:mb-2 px-2">
                                Create New Password
                            </p>
                            <p className="text-xs xs:text-sm sm:text-base text-slate-600 px-4">
                                Choose a strong password to secure your account
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="relative z-10"
                    >
                        <Form
                            name="reset_password_form"
                            layout="vertical"
                            onFinish={onFinish}
                            requiredMark="optional"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                            >
                                <Form.Item
                                    name="new_password"
                                    rules={[
                                        { required: true, message: "Please enter your new password!" },
                                        { min: 6, message: "Password must be at least 6 characters long." },
                                    ]}
                                >
                                    <Input.Password
                                        prefix={<LockOutlined className="text-purple-500 text-base sm:text-lg mr-1 sm:mr-2" />}
                                        placeholder="New Password"
                                        className="!py-2.5 xs:!py-3 sm:!py-3.5 !px-3 xs:!px-4 sm:!px-5 !rounded-xl sm:!rounded-2xl !shadow-[0_4px_15px_rgba(99,102,241,0.1)] !bg-gradient-to-r !from-white !to-purple-50/30 !border-purple-200/50 hover:!border-purple-400 focus:!border-purple-500 focus:!shadow-[0_4px_20px_rgba(99,102,241,0.2)] !transition-all !duration-300 !text-sm sm:!text-base hover:!scale-[1.01]"
                                    />
                                </Form.Item>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            >
                                <Form.Item
                                    name="confirm_password"
                                    dependencies={["new_password"]}
                                    rules={[
                                        { required: true, message: "Please confirm your password!" },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue("new_password") === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error("Passwords do not match!"));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password
                                        prefix={<LockOutlined className="text-purple-500 text-base sm:text-lg mr-1 sm:mr-2" />}
                                        placeholder="Confirm Password"
                                        className="!py-2.5 xs:!py-3 sm:!py-3.5 !px-3 xs:!px-4 sm:!px-5 !rounded-xl sm:!rounded-2xl !shadow-[0_4px_15px_rgba(99,102,241,0.1)] !bg-gradient-to-r !from-white !to-purple-50/30 !border-purple-200/50 hover:!border-purple-400 focus:!border-purple-500 focus:!shadow-[0_4px_20px_rgba(99,102,241,0.2)] !transition-all !duration-300 !text-sm sm:!text-base hover:!scale-[1.01]"
                                    />
                                </Form.Item>
                            </motion.div>

                            <Form.Item className="mb-0">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6, duration: 0.5 }}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            block
                                            loading={loading}
                                            className="!h-11 xs:!h-12 sm:!h-14 !rounded-xl sm:!rounded-2xl !bg-gradient-to-r !from-indigo-600 !via-purple-600 !to-teal-600 hover:!from-indigo-700 hover:!via-purple-700 hover:!to-teal-700 !border-0 !shadow-[0_8px_30px_rgba(99,102,241,0.4)] hover:!shadow-[0_12px_40px_rgba(99,102,241,0.5)] !transition-all !duration-500 !text-sm sm:!text-base !font-bold !relative !overflow-hidden group"
                                            style={{ backgroundSize: '200% auto' }}
                                        >
                                            <motion.span
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                                initial={{ x: '-100%' }}
                                                whileHover={{ x: '100%' }}
                                                transition={{ duration: 0.6 }}
                                            />
                                            <span className="relative z-10">Reset Password</span>
                                        </Button>
                                    </motion.div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.7, duration: 0.4 }}
                                    className="text-center mt-4 sm:mt-6"
                                >
                                    <Text className="text-slate-600 text-xs sm:text-sm">Remember your password? </Text>
                                    <Link
                                        to="/login"
                                        className="text-purple-600 hover:text-purple-700 font-bold transition-colors duration-200 relative group/login text-xs sm:text-sm"
                                    >
                                        Back to Login
                                        <motion.span
                                            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-teal-500"
                                            initial={{ width: 0 }}
                                            whileHover={{ width: '100%' }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </Link>
                                </motion.div>
                            </Form.Item>
                        </Form>
                    </motion.div>
                </div>

                {/* Bottom glow */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="absolute -bottom-4 sm:-bottom-6 md:-bottom-8 left-1/2 -translate-x-1/2 w-3/4 sm:w-4/5 h-6 sm:h-8 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent blur-xl sm:blur-2xl rounded-full"
                />
            </motion.div>
        </section>
    );
};

export default ResetPassword;