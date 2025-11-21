import React, { useState } from "react";
import { Button, Form, Input, Typography, message } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

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
                navigate("/profile"); // Redirect to Home
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

            // Defensive: only parse JSON if there’s content
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
        <section jsx="true" className="flex items-center justify-center min-h-screen bg-gradient-to-br from-rose-100 via-amber-100 to-white px-4 sm:px-6 md:px-8 font-poppins">
            <div className="w-full max-w-md sm:max-w-lg bg-white/40 backdrop-blur-lg shadow-2xl border border-white/50 rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,0,0,0.1)] mb-[100px] sm:mb-[150px]">
                <div className="text-center mb-6 sm:mb-8">
                    <div className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-amber-400 to-slate-600">
                        &#x1F375; Chai GPT
                    </div>
                    <p className="text-lg sm:text-xl font-semibold text-slate-700 mt-1 mb-2">
                        {isResetMode ? "Reset Password" : "Welcome Back"}
                    </p>
                    <p className="text-sm sm:text-base text-slate-500">
                        {isResetMode
                            ? "Enter your email to receive a password reset link."
                            : `Enhance With AI - Adrak and ilaichi \u{1F375}`}
                    </p>
                </div>

                {!isResetMode ? (
                    <Form
                        name="login_form"
                        initialValues={{ remember: true }}
                        onFinish={onLoginFinish}
                        layout="vertical"
                        requiredMark="optional"
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
                                prefix={<MailOutlined className="text-slate-400" />}
                                placeholder="Email"
                                className="py-2 rounded-lg shadow-sm focus:shadow-md focus:border-amber-500"
                            />
                        </Form.Item>

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
                                prefix={<LockOutlined className="text-slate-400" />}
                                placeholder="Password"
                                className="py-2 rounded-lg shadow-sm focus:shadow-md focus:border-amber-500"
                            />
                        </Form.Item>

                        <div className="text-right mb-4">
                            <button
                                type="button"
                                onClick={() => setIsResetMode(true)}
                                className="text-sm text-amber-600 hover:underline"
                            >
                                Forgot password?
                            </button>
                        </div>

                        <Form.Item className="mb-0">
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                className="!h-10 !rounded-xl !bg-amber-500 hover:!bg-amber-600 transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                                Log in
                            </Button>

                            <div className="text-center mt-4">
                                <Text className="text-slate-600">Don't have an account? </Text>
                                <Link
                                    to="/register"
                                    className="text-amber-600 hover:text-amber-800 font-medium transition duration-200"
                                >
                                    Sign up now
                                </Link>
                            </div>
                        </Form.Item>
                    </Form>
                ) : (
                    <Form
                        name="reset_form"
                        onFinish={onResetFinish}
                        layout="vertical"
                        requiredMark="optional"
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
                                prefix={<MailOutlined className="text-slate-400" />}
                                placeholder="Enter your email"
                                className="py-2 rounded-lg shadow-sm focus:shadow-md focus:border-amber-500"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                className="!h-10 !rounded-xl !bg-amber-500 hover:!bg-amber-600 transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                                Send Reset Link
                            </Button>
                            <div className="text-center mt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsResetMode(false)}
                                    className="text-sm text-amber-600 hover:underline"
                                >
                                    Back to Login
                                </button>
                            </div>
                        </Form.Item>
                    </Form>
                )}
            </div>
        </section>
    );
}
export default Login