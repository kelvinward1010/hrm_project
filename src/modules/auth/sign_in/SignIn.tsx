import { useTranslation } from "react-i18next";
import styles from "./SignIn.module.scss";
import { Button, Form, Input, notification, Select, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { forgotPasswordUrl } from "../../../routes/urls";
import { FACTORY_CONFIG } from "./types";

const { Title, Text } = Typography;

type FieldType = {
    username: string;
    password: string;
    factory: number;
};

export function SignIn() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const onFinish = (values: FieldType) => {
        const data = {
            username: values.username,
            password: values.password,
            company_id: values.factory,
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
                    <Form.Item<FieldType>
                        label={<Text className={styles.label_main}>Email:</Text>}
                        name="username"
                        className={styles.item_input}
                        rules={[
                            { required: true, message: 'Please input your username!' }, 
                            {max: 30, message: "Username must be at maximuns 30 characters"}
                        ]}
                    >
                        <Input className={styles.input_fix}/>
                    </Form.Item>

                    <Form.Item<FieldType>
                        label={<Text className={styles.label_main}>Password:</Text>}
                        name="password"
                        className={styles.item_input}
                        rules={[
                            { required: true, message: 'Please input your password!' }
                        ]}
                    >
                        <Input.Password className={styles.input_fix}/>
                    </Form.Item>

                    <Form.Item<FieldType>
                        label={<Text className={styles.label_main}>Factory:</Text>}
                        name="factory"
                        className={styles.item_input}
                        rules={[
                            { required: true, message: 'Please input your factory!' }
                        ]}
                    >
                        <Select
                            options={FACTORY_CONFIG}
                            placeholder="Select factory"
                            className="select_signin"
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 1, span: 22, }}>
                        <Button className={styles.button} htmlType="submit">
                            <Title level={5} className={styles.title_button}>
                                {t("auth.sign_in.name")}
                            </Title>
                        </Button>
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