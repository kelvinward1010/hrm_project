import { selector } from "recoil";
import { isDeleteItemAtom } from "./table.atom";

export const deleteItemState: any = selector({
    key: "deleteItemstate",
    get: ({ get }) => {
        const isDelete = get(isDeleteItemAtom);
        return isDelete;
    },
});
