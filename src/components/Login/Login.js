import React, { useState } from "react";
import { Button, Form, Input, Typography, message } from "antd";
import { ArrowRightOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";

const { Text } = Typography;

const Login = () => {
    const [isResetMode, setIsResetMode] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const onLoginFinish = async (values) => {
        try {
            const res = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            const data = await res.json();
            if (data.success) {
                login(data.user);
                message.success("Login successful!");
                navigate("/profile");
            } else {
                message.error(data.message);
            }
        } catch (err) {
            console.error(err);
            message.error("Login failed!");
        }
    };

    const onResetFinish = async (values) => {
        try {
            const res = await fetch(`${process.env.BACKEND_URL}/auth/request-reset`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: values.reset_email }),
            });

            let data = {};
            const text = await res.text();
            if (text) {
                data = JSON.parse(text);
            }

            if (res.ok && data.success) {
                message.success("Password reset link sent to your email!");
                setIsResetMode(false);
            } else {
                message.error(data.message || "Something went wrong while sending the reset email.");
            }
        } catch (err) {
            console.error(err);
            message.error("Failed to send reset email.");
        }
    };

    return (
        <section jsx="true" className="relative flex items-center justify-center min-h-screen overflow-hidden px-4 sm:px-6 md:px-8 font-poppins">
            {/* Dynamic Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-purple-50 to-teal-50">
                {/* Animated gradient mesh */}
                <motion.div
                    className="absolute top-[5%] right-[15%] w-[500px] h-[500px] bg-gradient-to-br from-purple-400/30 via-indigo-400/20 to-transparent rounded-full blur-3xl"
                    animate={{
                        x: [0, 60, -20, 0],
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
                    className="absolute bottom-[10%] left-[10%] w-[600px] h-[600px] bg-gradient-to-tr from-teal-400/30 via-cyan-400/20 to-transparent rounded-full blur-3xl"
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
                    className="absolute top-[40%] left-[40%] w-[450px] h-[450px] bg-gradient-to-bl from-indigo-300/25 via-violet-300/15 to-transparent rounded-full blur-3xl"
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

                {/* Animated dots pattern */}
                <div className="absolute inset-0 opacity-30">
                    <motion.div
                        className="w-full h-full"
                        style={{
                            backgroundImage: `radial-gradient(circle, rgba(99, 102, 241, 0.15) 1px, transparent 1px)`,
                            backgroundSize: '40px 40px'
                        }}
                        animate={{
                            backgroundPosition: ['0px 0px', '40px 40px'],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                </div>

                {/* Floating particles */}
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-purple-400/40 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
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
                initial={{ opacity: 0, y: 40, rotateX: 10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.1
                }}
                className="mt-[40px] relative w-full max-w-md sm:max-w-lg z-10"
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

                <div className="relative bg-white/80 backdrop-blur-2xl shadow-[0_20px_70px_rgba(99,102,241,0.2)] border border-white/80 rounded-3xl p-8 sm:p-10 transition-all duration-700 hover:shadow-[0_25px_90px_rgba(99,102,241,0.3)] mb-[100px] sm:mb-[150px] group overflow-hidden">
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
                        className="absolute top-0 right-0 w-32 h-32"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-purple-400/20 to-transparent rounded-tr-3xl" />
                        <motion.div
                            className="absolute top-4 right-4 w-12 h-12 border-2 border-purple-400/30 rounded-full"
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
                        className="absolute bottom-0 left-0 w-32 h-32"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-teal-400/20 to-transparent rounded-bl-3xl" />
                        <motion.div
                            className="absolute bottom-4 left-4 w-10 h-10 border-2 border-teal-400/30 rounded-lg"
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
                        className="text-center mb-8 sm:mb-10 relative z-10"
                    >
                        <motion.div
                            className="inline-block mb-4"
                            whileHover={{
                                scale: 1.1,
                                rotate: [0, -10, 10, -10, 0],
                            }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="text-6xl sm:text-7xl filter drop-shadow-lg">
                                🍵
                            </div>
                        </motion.div>

                        <motion.h1
                            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 bg-clip-text text-transparent tracking-tight"
                            initial={{ backgroundPosition: '0% 50%' }}
                            animate={{ backgroundPosition: '100% 50%' }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                            style={{ backgroundSize: '200% auto' }}
                        >
                            IGIDR Canteen Portal
                        </motion.h1>

                        <motion.div
                            key={isResetMode ? 'reset' : 'login'}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                        >
                            <p className="text-xl sm:text-2xl font-semibold text-indigo-900 mb-2">
                                {isResetMode ? "Reset Password" : "Welcome Back"}
                            </p>
                            <p className="text-sm sm:text-base text-slate-600">
                                {isResetMode
                                    ? "Enter your email to receive a password reset link."
                                    : "Enhance With AI - Adrak and ilaichi 🍵"}
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Forms */}
                    {!isResetMode ? (
                        <motion.div
                            key="login"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 30 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="relative z-10"
                        >
                            <Form
                                name="login_form"
                                initialValues={{ remember: true }}
                                onFinish={onLoginFinish}
                                layout="vertical"
                                requiredMark="optional"
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                >
                                    <Form.Item
                                        name="email"
                                        rules={[
                                            {
                                                type: "email",
                                                required: true,
                                                message: "Please input your Email!",
                                            },
                                        ]}
                                    >
                                        <Input
                                            prefix={<MailOutlined className="text-purple-500 text-lg mr-2" />}
                                            placeholder="Email"
                                            className="!py-3.5 !px-5 !rounded-2xl !shadow-[0_4px_15px_rgba(99,102,241,0.1)] !bg-gradient-to-r !from-white !to-purple-50/30 !border-purple-200/50 hover:!border-purple-400 focus:!border-purple-500 focus:!shadow-[0_4px_20px_rgba(99,102,241,0.2)] !transition-all !duration-300 !text-base hover:!scale-[1.01]"
                                        />
                                    </Form.Item>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                >
                                    <Form.Item
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please input your Password!",
                                            },
                                        ]}
                                    >
                                        <Input.Password
                                            prefix={<LockOutlined className="text-purple-500 text-lg mr-2" />}
                                            placeholder="Password"
                                            className="!py-3.5 !px-5 !rounded-2xl !shadow-[0_4px_15px_rgba(99,102,241,0.1)] !bg-gradient-to-r !from-white !to-purple-50/30 !border-purple-200/50 hover:!border-purple-400 focus:!border-purple-500 focus:!shadow-[0_4px_20px_rgba(99,102,241,0.2)] !transition-all !duration-300 !text-base hover:!scale-[1.01]"
                                        />
                                    </Form.Item>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6, duration: 0.4 }}
                                    className="text-right mb-6"
                                >
                                    <button
                                        type="button"
                                        onClick={() => setIsResetMode(true)}
                                        className="text-sm text-purple-600 hover:text-purple-700 font-semibold transition-all duration-300 relative group/forgot"
                                    >
                                        Forgot password?
                                        <motion.span
                                            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-teal-500"
                                            initial={{ width: 0 }}
                                            whileHover={{ width: '100%' }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </button>
                                </motion.div>

                                <Form.Item className="mb-0">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7, duration: 0.5 }}
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                block
                                                className="!h-14 !rounded-2xl !bg-gradient-to-r !from-indigo-600 !via-purple-600 !to-teal-600 hover:!from-indigo-700 hover:!via-purple-700 hover:!to-teal-700 !border-0 !shadow-[0_8px_30px_rgba(99,102,241,0.4)] hover:!shadow-[0_12px_40px_rgba(99,102,241,0.5)] !transition-all !duration-500 !text-base !font-bold !relative !overflow-hidden group"
                                                style={{ backgroundSize: '200% auto' }}
                                            >
                                                <motion.span
                                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                                    initial={{ x: '-100%' }}
                                                    whileHover={{ x: '100%' }}
                                                    transition={{ duration: 0.6 }}
                                                />
                                                <span className="relative z-10">Log in</span>
                                            </Button>
                                        </motion.div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.8, duration: 0.4 }}
                                        className="text-center mt-6"
                                    >
                                        <Text className="text-slate-600 text-sm">Don't have an account? </Text>
                                        <Link
                                            to="/register"
                                            className="text-purple-600 hover:text-purple-700 font-bold transition-colors duration-200 relative group/signup"
                                        >
                                            Sign up now
                                            <motion.span
                                                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-teal-500"
                                                initial={{ width: 0 }}
                                                whileHover={{ width: '100%' }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </Link>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.9, duration: 0.5 }}
                                        className="text-center mt-8"
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                        >
                                            <Link
                                                to={"https://igidr-cmmg.netlify.app/"}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="
                                                    inline-flex items-center gap-3
                                                    px-6 py-3.5
                                                    rounded-full
                                                    bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-red-500/10
                                                    text-rose-600
                                                    font-bold text-sm
                                                    border-2 border-rose-300/50
                                                    shadow-[0_4px_15px_rgba(244,63,94,0.15)]
                                                    hover:shadow-[0_8px_25px_rgba(244,63,94,0.25)]
                                                    hover:border-rose-400
                                                    hover:from-pink-500/20 hover:via-rose-500/20 hover:to-red-500/20
                                                    transition-all duration-300
                                                    group/link
                                                    relative overflow-hidden
                                                "
                                            >
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                                    initial={{ x: '-100%' }}
                                                    whileHover={{ x: '100%' }}
                                                    transition={{ duration: 0.6 }}
                                                />
                                                <span className="relative z-10">Non-member User Click Here</span>
                                                <ArrowRightOutlined className="text-sm text-rose-600 group-hover/link:translate-x-1 transition-transform duration-300 relative z-10" />
                                            </Link>
                                        </motion.div>
                                    </motion.div>
                                </Form.Item>
                            </Form>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="reset"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="relative z-10"
                        >
                            <Form
                                name="reset_form"
                                onFinish={onResetFinish}
                                layout="vertical"
                                requiredMark="optional"
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                >
                                    <Form.Item
                                        name="reset_email"
                                        rules={[
                                            {
                                                type: "email",
                                                required: true,
                                                message: 'Please enter a valid email address',
                                            },
                                        ]}
                                    >
                                        <Input
                                            prefix={<MailOutlined className="text-purple-500 text-lg mr-2" />}
                                            placeholder="Enter your email"
                                            className="!py-3.5 !px-5 !rounded-2xl !shadow-[0_4px_15px_rgba(99,102,241,0.1)] !bg-gradient-to-r !from-white !to-purple-50/30 !border-purple-200/50 hover:!border-purple-400 focus:!border-purple-500 focus:!shadow-[0_4px_20px_rgba(99,102,241,0.2)] !transition-all !duration-300 !text-base hover:!scale-[1.01]"
                                        />
                                    </Form.Item>
                                </motion.div>

                                <Form.Item>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4, duration: 0.5 }}
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                block
                                                className="!h-14 !rounded-2xl !bg-gradient-to-r !from-indigo-600 !via-purple-600 !to-teal-600 hover:!from-indigo-700 hover:!via-purple-700 hover:!to-teal-700 !border-0 !shadow-[0_8px_30px_rgba(99,102,241,0.4)] hover:!shadow-[0_12px_40px_rgba(99,102,241,0.5)] !transition-all !duration-500 !text-base !font-bold !relative !overflow-hidden"
                                            >
                                                <motion.span
                                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                                    initial={{ x: '-100%' }}
                                                    whileHover={{ x: '100%' }}
                                                    transition={{ duration: 0.6 }}
                                                />
                                                <span className="relative z-10">Send Reset Link</span>
                                            </Button>
                                        </motion.div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5, duration: 0.4 }}
                                        className="text-center mt-6"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => setIsResetMode(false)}
                                            className="text-sm text-purple-600 hover:text-purple-700 font-semibold transition-all duration-300 relative group/back"
                                        >
                                            Back to Login
                                            <motion.span
                                                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-teal-500"
                                                initial={{ width: 0 }}
                                                whileHover={{ width: '100%' }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </button>
                                    </motion.div>
                                </Form.Item>
                            </Form>
                        </motion.div>
                    )}
                </div>

                {/* Bottom glow */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent blur-2xl rounded-full"
                />
            </motion.div>
        </section>
    );
}

export default Login;