export const authUrl = "/auth";
export const signinUrl = `${authUrl}/sign-in`;
export const forgotPasswordUrl = `${authUrl}/forgot-password`;
export const changepasswordUrl = `${authUrl}/change-password`;

export const layoutUrl = "/";
export const employeeUrl = "/employee";
export const addemployeeUrl = `${employeeUrl}/add-edit-employee`;
export const editemployeeUrl = `${employeeUrl}/add-edit-employee/:id`;

export const settingsUrl = "/settings";

export const breadcrumbNameMap: Record<string, string> = {
    [employeeUrl]: 'Employee',
    [addemployeeUrl]: 'Add and edit employee',
    [editemployeeUrl]: 'Edit Employee',
    [settingsUrl]: 'Settings',
}