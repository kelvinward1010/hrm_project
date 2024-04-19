import { IUserInfo } from "@/types/user";
import { FormRule } from "antd";



export const RULES_SIGNIN: Record<keyof IUserInfo, FormRule[]> ={
    id: [],
    username: [
        { required: true, message: 'Please input your username!' },
        { max: 30, message: "Username must be at maximuns 30 characters" },
        { pattern: new RegExp("^(?!.*@)[A-Za-z0-9_]+$"), message: "Wrong format!" }
    ],
    email: [],
    level: [],
    company_id: [
        { required: true, message: 'Please input your factory!' }
    ],
    password: [
        { required: true, message: 'Please input your password!' },
        { min: 8, message: "Password must have at least 8 characters"},
        { max: 16, message: "Password must have at most 16 characters"}
    ]
}