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
        message = error.data?.message || statusDescriptions[status] || "An unexpected error occurred.";
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
        <div jsx="true" className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-rose-100 to-red-200 text-center px-6">
            <div className="max-w-xl w-full">

                <img
                    src="https://i.pinimg.com/736x/ec/16/9f/ec169fc7cb49648cc7eace9c1acdd476.jpg"
                    className="w-[450px]"
                    alt="Error Illustration"
                />
                <h1 className="text-8xl font-bold text-red-600">{status}</h1>
                <h2 className="text-3xl font-semibold mt-2 text-gray-800">{statusText}</h2>
                <p className="text-lg text-gray-600 mt-4">{message}</p>
                <Button
                    type="primary"
                    size="large"
                    className="mt-6"
                    onClick={() => window.location.href = "/"}
                >
                    Go Back Home
                </Button>
            </div>
        </div>
    );
}
export default ErrorPage