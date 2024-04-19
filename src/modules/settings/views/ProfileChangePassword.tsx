import { Form, Input, Typography } from "antd";
import { useTranslation } from "react-i18next";
import styles from './ProfileChangePassword.module.scss';
import { LabelConfig } from "@/modules/auth/conponents/LabelConfig";
import { ButtonConfigAntd } from "@/components";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { IChangePassword } from "../type";
import { RULES_CHANGE_PASSWORD, useChangePassword } from "../api/changepassword";
import { Notification } from "@/components/notification/Notification";


const { Title } = Typography;

type FieldType = {
    password: string;
    password_confirmation: string;
};

export function ProfileChangePassword() {

    const { t } = useTranslation();
    const user: any = useSelector((state: RootState) => state.auth.user);

    const onFinish = (values: FieldType) => {
        const data: IChangePassword = {
            email: user?.email,
            company_id: user?.company_id,
            password: values.password,
            password_confirmation: values.password_confirmation,
        }
        useChangePassword(data).then((res: any) => {
            if(res?.result === true) {
                Notification({
                    message: "Successfully change password",
                    type: "success",
                })
            }
        }).catch((err: any) =>{
            Notification({
                message: err.data?.message,
                type: "error",
            })
        })
    };

    return (
        <div className={styles.container}>
            <Title>{t("settings.lable_settings")}</Title>
            <div className={styles.center}>
                <Form
                    name="change_password"
                    labelCol={{ span: 15, push: 1 }}
                    wrapperCol={{ span: 22, offset: 1 }}
                    className={styles.form_signin}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                    layout={'vertical'}
                >
                    <Title level={3}>{t("settings.lable_change_password")}</Title>
                    <Form.Item<FieldType>
                        label={<LabelConfig label={t("auth.label.newpassword")} />}
                        name="password"
                        rules={RULES_CHANGE_PASSWORD.password}
                    >
                        <Input.Password className={"input_auth"}/>
                    </Form.Item>

                    <Form.Item<FieldType>
                        label={<LabelConfig label={t("auth.label.confirmpassword")} />}
                        name="password_confirmation"
                        rules={RULES_CHANGE_PASSWORD.password_confirmation}
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
