import ReactDOM from "react-dom/client";
import App from "./App";
import "@ant-design/v5-patch-for-react-19";
import { createBrowserRouter, RouterProvider } from "react-router";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Body from "./components/Body";
import Profile from "./components/Profile/Profile";
import Lunch from "./components/Lunch/Lunch";
import Dinner from "./components/Dinner/Dinner";
import Home from "./components/Home/Home";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorPage from "./components/Error/ErrorPage";
import VerifyEmail from "./components/Register/VerifyEmail";
import VerifyInfo from "./components/Register/VerifyInfo";
import ResetPassword from "./components/Login/ResetPassword";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Login /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "verify-info", element: <VerifyInfo /> },
            { path: "verify-email/:token", element: <VerifyEmail /> },
            { path: "reset-password/:token", element: <ResetPassword /> },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "/",
                        element: <Body />,
                        children: [
                            { path: "/home", element: <Home /> },
                            { path: "profile", element: <Profile /> },
                            { path: "lunch", element: <Lunch /> },
                            { path: "dinner", element: <Dinner /> },
                        ],
                    },
                ],
            },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <AuthProvider>
        <RouterProvider router={appRouter} />
    </AuthProvider>
);
