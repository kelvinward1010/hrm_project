import { createBrowserRouter, Navigate } from "react-router-dom";
import { authUrl, employeeUrl, forgotPasswordUrl, layoutUrl, signinUrl } from "./urls";
import { Auth, Employee, ForgotPassword, Layout, SignIn } from "../modules";
import { Error } from "../components";


interface RouteProps {
    children: React.ReactNode
}

const ProtectedRoute: React.FC<RouteProps> = ({ children }) => {
    const isAuthenticated = false;
    return isAuthenticated ? <>{children}</> : <Navigate to={signinUrl} replace />;
};



export const routerConfig = createBrowserRouter([
    {
        path: layoutUrl,
        element: (
            <ProtectedRoute>
                <Layout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: employeeUrl,
                element: <Employee />
            }
        ]
    },
    {
        path: authUrl,
        element: <Auth />,
        errorElement: <Error />,
        children: [
            {
                path: signinUrl,
                element: <SignIn />
            },
            {
                path: forgotPasswordUrl,
                element:<ForgotPassword />
            }
        ]
    }
])