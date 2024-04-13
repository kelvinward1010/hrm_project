import { createBrowserRouter, Navigate } from "react-router-dom";
import { addemployeeUrl, authUrl, changepasswordUrl, editemployeeUrl, employeeUrl, forgotPasswordUrl, layoutUrl, settingsUrl, signinUrl } from "./urls";
import {
    Auth, 
    ChangePassword, 
    ForgotPassword, 
    Layout, 
    SignIn 
} from "@/modules";
import { Error } from "@/components";
import storage from "@/utils/storage";
import { 
    AddEditEmployee, 
    Employee 
} from "@/modules/employee";
import { ProfileChangePassword } from "@/modules/settings";


interface RouteProps {
    children: React.ReactNode
}

const ProtectedRoute: React.FC<RouteProps> = ({ children }) => {
    const isAuthenticated = storage.getToken();
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
            },
            {
                path: addemployeeUrl,
                element: <AddEditEmployee />
            },
            {
                path: editemployeeUrl,
                element: <AddEditEmployee />
            },
            {
                path: settingsUrl,
                element: <ProfileChangePassword />
            },
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
            },
            {
                path: changepasswordUrl,
                element: <ChangePassword />
            }
        ]
    }
])