import { TitleAll } from "./TitleAll";
import styles from "./EmployeeInfomation.module.scss";
import { useTranslation } from "react-i18next";
import { Col, Form, Input, Row } from "antd";
import { useState } from "react";
import { Notification } from "@/components/notification/Notification";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};

interface FieldData {
    name: string | number | (string | number)[];
    value?: any;
    touched?: boolean;
    validating?: boolean;
    errors?: string[];
}

interface CustomizedFormProps {
    onChange: (fields: FieldData[]) => void;
    fields: FieldData[];
    onSubmit: (data: any) => void;
    onFailure: (data: any) => void;
}

export function EmployeeInfomation() {
    const { t } = useTranslation();
    const [fields, setFields] = useState<FieldData[]>([
        {
            name: ['nik'],
            value: "",
        },
        {
            name: ['mobile'],
            value: "",
        },
    ]);

    const onFinish = (values: any) => {
        const data = {
            nik: values.nik,
            mobile: values.mobile,
        }
        Notification({
            message: "Created OK",
            type: "success",
        })
        console.log(data)
    }

    const onFinishFailed = (errorInfo: any) => {
        Notification({
            message: errorInfo,
            type: "error",
        })
    };

    return (
        <div className={styles.container}>
            <TitleAll title={t("features.employee.features_add_new.titleall.title1")}/>
            <CustomizedForm
                fields={fields}
                onChange={(newFields) => {
                    setFields(newFields);
                }}
                onFailure={(error: any) => onFinishFailed(error)}
                onSubmit={(values: any) => onFinish(values)}
            />
        </div>
    )
}


const CustomizedForm: React.FC<CustomizedFormProps> = ({ onChange, fields, onFailure, onSubmit }) => (
    <Form
        name="profile"
        {...formItemLayout}
        fields={fields}
        onFieldsChange={(_, allFields) => {
            onChange(allFields);
        }}
        onFinish={onSubmit}
        onFinishFailed={onFailure}
        initialValues={{
            "nik": fields.find(value => value?.value != null && value?.name == "nik")?.value,
            "mobile": fields.find(value => value?.value != null && value?.name == "mobile")?.value,
        }}
        className={styles.formmain}
    >
        <Row justify={'space-between'}>
            <Col span={11}>
                <Form.Item
                    name="nik"
                    label="NIK :"
                    rules={[{message: 'NIK is required!' }]}
                >
                    <Input className="input_inside"/>
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    name="mobile"
                    label="Mobile No :"
                    rules={[{message: 'Mobile is required!' }]}
                >
                    <Input className="input_inside"/>
                </Form.Item>
            </Col>
        </Row>
    </Form>
);