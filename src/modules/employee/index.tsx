import { lazyLoad } from "@/utils/loadable"

export const Employee = lazyLoad(
    () => import("./views/Employee"),
    (module) => module.Employee,
)

export const AddEditEmployee = lazyLoad(
    () => import("./views/AddEditEmployee"),
    (module) => module.AddEditEmployee,
)