import { Button, Form, Input, Typography, message } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router";

const { Title, Text } = Typography;

const Register = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const res = await fetch(`${process.env.BACKEND_URL}/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            const data = await res.json();
            if (data.success) {
                message.success("Registration successful! Please verify your email.");
                navigate("/verify-info");
            } else {
                message.error(data.message || "Registration failed");
            }
        } catch (err) {
            console.error(err);
            message.error("Registration failed!");
        }
    };

    return (
        <section jsx="true" className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#e0c3fc] via-[#8ec5fc] to-[#ffffff] px-4 sm:px-6 md:px-8 font-poppins">
            <div className="w-full max-w-md sm:max-w-lg bg-white/30 backdrop-blur-lg shadow-2xl border border-white/40 rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,0,0,0.1)] mb-[100px] sm:mb-[150px]">
                <div className="text-center mb-6 sm:mb-8">
                    <div className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600">
                        🍵 Chai GPT
                    </div>
                    <p className="text-lg sm:text-xl font-semibold text-gray-700 mt-1 mb-2">
                        Sign up & sip the intelligence
                    </p>
                    <p className="text-sm sm:text-base text-gray-500">
                        Enhance With AI - Adrak and ilaichi 🍵
                    </p>
                </div>

                <Form
                    name="normal_signup"
                    onFinish={onFinish}
                    layout="vertical"
                    requiredMark="optional"
                >
                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: "Please input your Name!" }]}
                    >
                        <Input
                            prefix={<UserOutlined className="text-gray-400" />}
                            placeholder="Full Name"
                            className="py-2 rounded-lg shadow-sm focus:shadow-md focus:border-indigo-500"
                        />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type: "email",
                                required: true,
                                message: "Please enter a valid email address",
                            },
                            {
                                validator: (_, value) =>
                                    value && value.endsWith("@igidr.ac.in")
                                        ? Promise.resolve()
                                        : Promise.reject(
                                            new Error("IGIDR email address required for access")
                                        ),
                            },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined className="text-gray-400" />}
                            placeholder="Email Address"
                            className="py-2 rounded-lg shadow-sm focus:shadow-md focus:border-indigo-500"
                        />
                    </Form.Item>


                    <Form.Item
                        name="password"
                        extra="Password needs to be at least 8 characters."
                        rules={[
                            { required: true, message: "Please input your Password!" },
                            {
                                min: 8,
                                message: "Password must be at least 8 characters.",
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="text-gray-400" />}
                            placeholder="Password"
                            className="py-2 rounded-lg shadow-sm focus:shadow-md focus:border-indigo-500"
                        />
                    </Form.Item>

                    <Form.Item className="mb-0">
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            className="!h-10 !rounded-xl !bg-indigo-600 hover:!bg-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                            Sign up
                        </Button>

                        <div className="text-center mt-4">
                            <Text className="text-gray-600">Already have an account? </Text>
                            <Link
                                to="/login"
                                className="text-indigo-600 hover:text-indigo-800 font-medium transition duration-200"
                            >
                                Sign in
                            </Link>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </section>
    );
}

export default Register