import { selector } from "recoil";
import { isAddEmplyee, isFilledContractInfomation, isFilledEmployeeInfomation } from "./add.atom";

export const addEmployeeState: any = selector({
    key: "addEmployeeState",
    get: ({ get }) => {
        const isAdd = get(isAddEmplyee);
        return isAdd;
    },
});

export const filledEmployeeInfomation: any = selector({
    key: "filledEmployeeInfomation",
    get: ({ get }) => {
        const isFilledInfo = get(isFilledEmployeeInfomation);
        return isFilledInfo;
    },
});

export const filledContractInfomation: any = selector({
    key: "filledContractInfomation",
    get: ({ get }) => {
        const isFilledContractInfo = get(isFilledContractInfomation);
        return isFilledContractInfo;
    },
});