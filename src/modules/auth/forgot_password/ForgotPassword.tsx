import { Button, Form, Input, Typography } from "antd";
import styles from "./ForgotPassword.module.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { signinUrl } from "../../../routes/urls";

const { Title, Text } = Typography;

type FieldType = {
    email: string;
};

export function ForgotPassword() {
    const { t } = useTranslation();
    const navigate = useNavigate();


    const onFinish = (values: FieldType) => {
        const data = {
            email: values.email,
        }
        console.log(data)
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
                        label={<Text className={styles.label_main}>Email:</Text>}
                        name="email"
                        className={styles.item_input}
                        rules={[
                            { required: true, message: 'Please input your email!' }, 
                            {max: 30, message: "Email must be at maximuns 30 characters"}
                        ]}
                    >
                        <Input className={styles.input_fix}/>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 1, span: 22, }}>
                        <Button className={styles.button} htmlType="submit">
                            <Title level={5} className={styles.title_button}>
                                {t("auth.forgot_password.label_button")}
                            </Title>
                        </Button>
                    </Form.Item>
                    <div className={styles.forgot}>
                        <Text onClick={() => navigate(signinUrl)} className={styles.forgot_title}>
                            {t("auth.forgot_password.sign_in_text")}
                        </Text>
                    </div>
                </Form>
            </div>
        </div>
    )
}