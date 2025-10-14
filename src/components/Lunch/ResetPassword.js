import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router";

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
        <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-rose-100 via-amber-100 to-white px-4 sm:px-6 md:px-8 font-poppins">
            <div className="w-full max-w-md bg-white/40 backdrop-blur-lg shadow-2xl border border-white/50 rounded-3xl p-8 mb-[100px] transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,0,0,0.1)]">
                <div className="text-center mb-8">
                    <div className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-amber-400 to-slate-600">
                        🔐 Reset Password
                    </div>
                    <p className="text-sm sm:text-base text-slate-500 mt-2">
                        Enter your new password below.
                    </p>
                </div>

                <Form name="reset_password_form" layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        name="new_password"
                        label="New Password"
                        rules={[
                            { required: true, message: "Please enter your new password!" },
                            { min: 6, message: "Password must be at least 6 characters long." },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="text-slate-400" />}
                            placeholder="Enter new password"
                            className="py-2 rounded-lg shadow-sm focus:shadow-md focus:border-amber-500"
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirm_password"
                        label="Confirm Password"
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
                            prefix={<LockOutlined className="text-slate-400" />}
                            placeholder="Confirm password"
                            className="py-2 rounded-lg shadow-sm focus:shadow-md focus:border-amber-500"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={loading}
                            className="!h-10 !rounded-xl !bg-amber-500 hover:!bg-amber-600 transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                            Reset Password
                        </Button>
                        <div className="text-center mt-4">
                            <Text className="text-slate-600">Back to </Text>
                            <a
                                href="/login"
                                className="text-amber-600 hover:text-amber-800 font-medium transition duration-200"
                            >
                                Login
                            </a>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </section>
    );
};

export default ResetPassword;
