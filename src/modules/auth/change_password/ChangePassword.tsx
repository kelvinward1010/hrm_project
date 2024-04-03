import { useTranslation } from "react-i18next";
import styles from "./ChangePassword.module.scss";
import { Form, Input, notification, Typography } from "antd";
import { LabelConfig } from "../conponents/LabelConfig";
import { ButtonConfigAntd } from "@/components";

const { Title } = Typography;

type FieldType = {
    newpassword: string;
    confirmpassword: string;
};

export function ChangePassword() {
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
                        name="newpassword"
                        className={styles.item_input}
                        rules={[
                            { required: true, message: 'Please input your password!' },
                        ]}
                    >
                        <Input className={"input_auth"}/>
                    </Form.Item>

                    <Form.Item<FieldType>
                        label={<LabelConfig label={t("auth.label.confirmpassword")} />}
                        name="confirmpassword"
                        className={styles.item_input}
                        rules={[
                            { required: true, message: 'Please input your confirm password!' }
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
                        />
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}