import { Form, Input, notification, Typography } from "antd";
import { useTranslation } from "react-i18next";
import styles from './ProfileChangePassword.module.scss';
import { LabelConfig } from "@/modules/auth/conponents/LabelConfig";
import { ButtonConfigAntd } from "@/components";


const { Title } = Typography;

type FieldType = {
    newpassword: string;
    confirmpassword: string;
};

export function ProfileChangePassword() {

    const { t } = useTranslation();

    const onFinish = (values: FieldType) => {
        const data = {
            newpassword: values.newpassword,
            confirmpassword: values.confirmpassword,
        }
        console.log(data)
        notification.info({
            message: "Ok",
        })
    };

    return (
        <div className={styles.container}>
            <Title>{t("settings.lable_settings")}</Title>
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
                    <Title level={3}>{t("settings.lable_change_password")}</Title>
                    <Form.Item<FieldType>
                        label={<LabelConfig label={t("auth.label.newpassword")} />}
                        name="newpassword"
                        rules={[
                            { required: true, message: 'Please input your password!' },
                        ]}
                    >
                        <Input.Password className={"input_auth"}/>
                    </Form.Item>

                    <Form.Item<FieldType>
                        label={<LabelConfig label={t("auth.label.confirmpassword")} />}
                        name="confirmpassword"
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newpassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The new password that you entered do not match!'));
                                },
                            }),
                        ]}
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
