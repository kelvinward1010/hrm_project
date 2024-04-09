import { createBrowserRouter, Navigate } from "react-router-dom";
import { addnewemployeeUrl, authUrl, changepasswordUrl, employeeUrl, forgotPasswordUrl, layoutUrl, signinUrl } from "./urls";
import { 
    AddNewEmployee, 
    Auth, 
    ChangePassword, 
    Employee, 
    ForgotPassword, 
    Layout, 
    SignIn 
} from "@/modules";
import { Error } from "@/components";
import storage from "@/utils/storage";


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
                path: addnewemployeeUrl,
                element: <AddNewEmployee />
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
            },
            {
                path: changepasswordUrl,
                element: <ChangePassword />
            }
        ]
    }
])