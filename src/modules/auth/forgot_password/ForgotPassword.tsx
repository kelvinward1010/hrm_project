import { Form, Input, Typography } from "antd";
import styles from "./ForgotPassword.module.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { LabelConfig } from "../conponents/LabelConfig";
import { ButtonConfigAntd } from "@/components";
import { changepasswordUrl, signinUrl } from "@/routes/urls";

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
        navigate(changepasswordUrl)
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
                        label={<LabelConfig label={t("auth.label.email")} />}
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email!' }, 
                            {pattern: new RegExp("^.+@.+\..+$"), message: "Email format is invalid"}
                        ]}
                    >
                        <Input className={"input_auth"}/>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 1, span: 22, }}>
                        <ButtonConfigAntd
                            label={t("auth.forgot_password.label_button")}
                            background="var(--button-color-dark-blue)"
                            colorLabel="white"
                            border="none"
                            fontSizeLabel={14}
                            fontWeightLabel={500}
                            height={40}
                            htmlType={'submit'}
                        />
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