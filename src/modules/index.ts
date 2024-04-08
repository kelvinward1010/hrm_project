import { lazyLoad } from "@/utils/loadable";

export { Auth } from "./auth/Auth";
export { SignIn } from "./auth/sign_in/SignIn";
export { ForgotPassword } from "./auth/forgot_password/ForgotPassword";
export { ChangePassword} from "./auth/change_password/ChangePassword";

// export { Layout } from "./app/Layout";
// export { Employee } from "./employee/views/Employee";
// export { AddNewEmployee } from "./employee/views/AddNewEmployee";


export const Layout = lazyLoad(
    () => import("./app/Layout"),
    (module) => module.Layout,
)

export const Employee = lazyLoad(
    () => import("./employee/views/Employee"),
    (module) => module.Employee,
)

export const AddNewEmployee = lazyLoad(
    () => import("./employee/views/AddNewEmployee"),
    (module) => module.AddNewEmployee,
)