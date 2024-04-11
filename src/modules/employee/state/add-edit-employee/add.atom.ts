import { atom } from "recoil";

export const isAddEmplyee = atom({
    key: "isAddEmplyee",
    default: true,
});

export const isFilledEmployeeInfomation = atom({
    key: "isFilledEmployeeInfomation",
    default: false,
})

export const isFilledContractInfomation = atom({
    key: "isFilledContractInfomation",
    default: false,
})


export const employeeDetail = atom({
    key: "employeeDetail",
    default: {},
})