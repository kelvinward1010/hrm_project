import { useTranslation } from "react-i18next";
import styles from "./ChangePassword.module.scss";
import { Form, Input, Typography } from "antd";
import { LabelConfig } from "../conponents/LabelConfig";
import { ButtonConfigAntd } from "@/components";
import { useLocation } from "react-router-dom";
import { ResetPasswordProps, RULES_RESET_PASSWORD, useResetPassword } from "../api/reset_password";
import { Notification } from "@/components/notification/Notification";

const { Title } = Typography;

type FieldType = {
    password: string;
    password_confirmation: string;
};

export function ChangePassword() {
    const { t } = useTranslation();
    const search = useLocation()?.search;
    const params = new URLSearchParams(search);
    const token: any = params?.get('token');
    const email: any = params?.get('email');
    const companyId: any = params?.get('company_id');

    const configResetPassword = useResetPassword({
        config: {
            onSuccess: () => {
                Notification({
                    message: 'Reset Password Successful',
                    type: 'success',
                })
            },
            onError: () => {
                Notification({
                    message: 'Failed to reset password',
                    type: 'error',
                })
            }
        }
    })


    const onFinish = (values: FieldType) => {
        const data: ResetPasswordProps = {
            email: email,
            company_id: companyId,
            token: token,
            password: values.password,
            password_confirmation: values.password_confirmation,
        }
        configResetPassword.mutate(data);
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
                    <Title level={3}>{t("auth.change_password.title")}</Title>
                    <Form.Item<FieldType>
                        label={<LabelConfig label={t("auth.label.newpassword")} />}
                        name="password"
                        rules={RULES_RESET_PASSWORD.password}
                    >
                        <Input.Password className={"input_auth"}/>
                    </Form.Item>

                    <Form.Item<FieldType>
                        label={<LabelConfig label={t("auth.label.confirmpassword")} />}
                        name="password_confirmation"
                        rules={RULES_RESET_PASSWORD.password_confirmation}
                    >
                        <Input.Password className={"input_auth"}/>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 1, span: 22, }}>
                        <ButtonConfigAntd
                            label={t("auth.change_password.title_button")}
                            background="var(--button-color-dark-blue)"
                            colorLabel="white"
                            border="none"
                            fontSizeLabel={14}
                            fontWeightLabel={500}
                            height={40}
                            htmlType={'submit'}
                        />
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}