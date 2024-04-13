import { lazyLoad } from "@/utils/loadable";

export { Auth } from "./auth/Auth";
export { SignIn } from "./auth/sign_in/SignIn";
export { ForgotPassword } from "./auth/forgot_password/ForgotPassword";
export { ChangePassword} from "./auth/change_password/ChangePassword";

export const Layout = lazyLoad(
    () => import("./app/Layout"),
    (module) => module.Layout,
)