import React from "react";
import { useRouteError, isRouteErrorResponse } from "react-router";
import { Button } from "antd";

const statusDescriptions = {
    400: "Bad Request – The server could not understand your request.",
    401: "Unauthorized – Please log in to access this page.",
    403: "Forbidden – You don’t have permission to view this.",
    404: "Page Not Found – The page you are looking for doesn't exist.",
    500: "Internal Server Error – Something went wrong on our end.",
    503: "Service Unavailable – We're currently offline for maintenance.",
};

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    let status, statusText, message;

    if (isRouteErrorResponse(error)) {
        status = error.status;
        statusText = error.statusText;
        message =
            error.data?.message ||
            statusDescriptions[status] ||
            "An unexpected error occurred.";
    } else if (error instanceof Error) {
        status = 500;
        statusText = "Internal Server Error";
        message = error.message;
    } else {
        status = 500;
        statusText = "Unknown Error";
        message = "An unexpected error occurred.";
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-rose-100 to-red-200 text-center px-4 sm:px-6 md:px-8 py-10">
            <div className="max-w-md sm:max-w-lg md:max-w-xl w-full">
                {/* Error Illustration */}
                <img
                    src="https://i.pinimg.com/736x/ec/16/9f/ec169fc7cb49648cc7eace9c1acdd476.jpg"
                    alt="Error Illustration"
                    className="w-[80%] sm:w-[400px] md:w-[450px] mx-auto mb-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                />

                {/* Error Code */}
                <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-red-600">
                    {status}
                </h1>

                {/* Error Title */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mt-2 text-gray-800">
                    {statusText}
                </h2>

                {/* Error Message */}
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-4 leading-relaxed px-2 sm:px-4">
                    {message}
                </p>

                {/* Action Button */}
                <Button
                    type="primary"
                    size="large"
                    className="mt-6 !bg-red-500 hover:!bg-red-600 !border-none !rounded-xl !px-6 !py-5 text-white font-medium transition-all duration-300"
                    onClick={() => (window.location.href = "/")}
                >
                    Go Back Home
                </Button>
            </div>
        </div>
    );
};

export default ErrorPage;
