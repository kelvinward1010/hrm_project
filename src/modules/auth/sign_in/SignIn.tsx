import { useTranslation } from "react-i18next";
import styles from "./SignIn.module.scss";
import { Form, Input, Select, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { FACTORY_CONFIG } from "./types";
import { LabelConfig } from "../conponents/LabelConfig";
import { Notification } from "@/components/notification/Notification";
import { ButtonConfigAntd } from "@/components";
import { employeeUrl, forgotPasswordUrl } from "@/routes/urls";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { login } from "@/redux/actions/authAction";
import { URL_DETAIL_USER } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { IUserInfo } from "@/types/user";
import { updateUser } from "@/redux/slices/authSlice";

const { Title, Text } = Typography;

type FieldType = {
    username: string;
    password: string;
    factory: number;
};

export function SignIn() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const loading: boolean = useSelector((state: RootState) => state.auth.isLoading);

    const onFinish = (values: FieldType) => {
        const data = {
            username: values.username,
            password: values.password,
            company_id: values.factory,
        }
        dispatch(login(data)).then((response: any) => {
            if(response.payload?.token){
                Notification({
                    message: "Login successful",
                    type: "success",
                })
                apiClient.get(URL_DETAIL_USER).then((response: any) => {
                    const userinfo: IUserInfo = {
                        id: response.data?.id,
                        username: response.data?.username,
                        email: response.data?.email,
                        level: response.data?.level,
                        company_id: response.data?.company_id,
                    }
                    dispatch(updateUser(userinfo))
                });
                navigate(employeeUrl);
            }else{
                Notification({
                    message: response.payload?.message,
                    type: "error",
                })
            }
        })
    };

    return (
        <div className={styles.container}>
            <Title>{t("auth.sign_in.name")}</Title>
            <div className={styles.center}>
                <Form
                    name="signin"
                    labelCol={{ span: 15, push: 1 }}
                    wrapperCol={{ span: 22, offset: 1 }}
                    className={styles.form_signin}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                    layout={'vertical'}
                >
                    <Form.Item<FieldType>
                        label={<LabelConfig label={t("auth.label.username")} />}
                        name="username"
                        rules={[
                            { required: true, message: 'Please input your username!' }, 
                            {max: 30, message: "Username must be at maximuns 30 characters"},
                            {pattern: new RegExp("^(?!.*@)[A-Za-z0-9_]+$"), message: "Wrong format!"}
                        ]}
                    >
                        <Input className={"input_auth"}/>
                    </Form.Item>

                    <Form.Item<FieldType>
                        label={<LabelConfig label={t("auth.label.password")} />}
                        name="password"
                        rules={[
                            { required: true, message: 'Please input your password!' },
                            { min: 8, message: "Password must have at least 8 characters"},
                            { max: 16, message: "Password must have at most 16 characters"}
                        ]}
                    >
                        <Input.Password className={"input_auth"}/>
                    </Form.Item>

                    <Form.Item<FieldType>
                        label={<LabelConfig label={t("auth.label.factory")} />}
                        name="factory"
                        rules={[
                            { required: true, message: 'Please input your factory!' }
                        ]}
                    >
                        <Select
                            options={FACTORY_CONFIG}
                            placeholder="Select factory"
                            className="select_fix"
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 1, span: 22, }}>
                        <ButtonConfigAntd
                            label={t("auth.sign_in.name")}
                            background="var(--button-color-dark-blue)"
                            colorLabel="white"
                            border="none"
                            fontSizeLabel={14}
                            fontWeightLabel={500}
                            height={40}
                            htmlType={"submit"}
                            disabled={loading}
                        />
                    </Form.Item>
                    <div className={styles.forgot}>
                        <Text onClick={() => navigate(forgotPasswordUrl)} className={styles.forgot_title}>
                            {t("auth.sign_in.forgot_password")}
                        </Text>
                    </div>
                </Form>
            </div>
        </div>
    )
}