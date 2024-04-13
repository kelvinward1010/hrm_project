import { lazyLoad } from "@/utils/loadable";


export const ProfileChangePassword = lazyLoad(
    () => import("./views/ProfileChangePassword"),
    (module) => module.ProfileChangePassword,
)