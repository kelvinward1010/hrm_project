export const authUrl = "/auth";
export const signinUrl = "/auth/sign-in";
export const forgotPasswordUrl = "/auth/forgot-password";
export const changepasswordUrl = "/auth/change-password";

export const layoutUrl = "/";
export const employeeUrl = "/employee";
export const addemployeeUrl = "/employee/add-edit-employee";
export const editemployeeUrl = "/employee/add-edit-employee/:id";

export const breadcrumbNameMap: Record<string, string> = {
    [employeeUrl]: 'Employee',
    [addemployeeUrl]: 'Add Employee',
    [editemployeeUrl]: 'Edit Employee',
}