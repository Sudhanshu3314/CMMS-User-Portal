import { Typography } from "antd";
import { Link } from "react-router";
const { Title, Paragraph } = Typography;

const VerifyInfo = () => (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-white px-4">
        <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-2xl max-w-md w-full text-center border border-pink-200">
            <div className="mb-5">
                <svg
                    className="mx-auto h-16 w-16 text-pink-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l9 6 9-6M4.5 6h15A2.5 2.5 0 0122 8.5v7A2.5 2.5 0 0119.5 18h-15A2.5 2.5 0 012 15.5v-7A2.5 2.5 0 014.5 6z"
                    />
                </svg>
            </div>

            <Title
                level={3}
                className="!text-pink-600 !text-2xl sm:!text-3xl !font-bold !mb-4"
            >
                Check Your Inbox 📬
            </Title>
            <Paragraph className="text-gray-700 text-sm sm:text-base leading-relaxed">
                We’ve sent a verification link to your email address.
                <br className="hidden sm:block" />
                Please open your inbox and click the link to verify your email and activate your account.
            </Paragraph>
            <div className="mt-6 text-xs text-gray-400">
                <p><Link target="_blank" to="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox" className="text-blue-700">Please, Click me to Verify yourself</Link></p>
            </div>
            <div className="mt-6 text-xs text-gray-400">
                Didn’t receive the email ? 
                <p><Link target="_blank" to="https://whytedevil.netlify.app/" className="text-blue-700">Contact Us</Link></p>
            </div>
        </div>
    </div>
);

export default VerifyInfo;
