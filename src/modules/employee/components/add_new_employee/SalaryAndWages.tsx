import { useTranslation } from "react-i18next";
import styles from "./SalaryAndWages.module.scss";
import { TitleAll } from "./TitleAll";
import { Col, Form, InputNumber, Row, Typography } from "antd";
import { useState } from "react";
import { Notification } from "@/components/notification/Notification";

const { Text } = Typography;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
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
    t?: any;
}

export function SalaryAndWages() {
    const { t } = useTranslation();
    const [fields, setFields] = useState<FieldData[]>([
        {
            name: ['basic_salary'], value: "",
        },
        {
            name: ['audit_salary'], value: "",
        },
        {
            name: ['safety_insurance'], value: "",
        },
        {
            name: ['health_insurance'], value: "",
        },
        {
            name: ['meal_allowance'], value: "",
        },
    ]);

    const onFinish = (values: any) => {
        const data = {
            basic_salary: values.basic_salary,
            audit_salary: values.audit_salary,
        }
        Notification({
            message: "Created OK",
            type: "success",
        })
        console.log(data)
    }

    return (
        <div className={styles.container}>
            <TitleAll title={t("features.employee.features_add_new.titleall.title4")}/>
            <CustomizedForm
                fields={fields}
                onChange={(newFields) => {
                    setFields(newFields);
                }}
                onSubmit={(values: any) => onFinish(values)}
                t={t}
            />
        </div>
    )
}

const configPrefix = () => {
    return <Text style={{color: "var(--text-color-blue)"}}>Rp</Text>
}

const CustomizedForm: React.FC<CustomizedFormProps> = ({ onChange, fields, onSubmit, t }) => (
    <Form
        name="Salaryandwages"
        {...formItemLayout}
        fields={fields}
        onFieldsChange={(_, allFields) => {
            onChange(allFields);
        }}
        onFinish={onSubmit}
        initialValues={{
            "basic_salary": fields.find(value => value?.value != null && value?.name == "basic_salary")?.value,
            "audit_salary": fields.find(value => value?.value != null && value?.name == "audit_salary")?.value,
            "safety_insurance": fields.find(value => value?.value != null && value?.name == "safety_insurance")?.value,
            "health_insurance": fields.find(value => value?.value != null && value?.name == "health_insurance")?.value,
            "meal_allowance": fields.find(value => value?.value != null && value?.name == "meal_allowance")?.value,
        }}
        className={styles.formmain}
        autoComplete="off"
    >
        <Row justify={'space-between'} wrap>
            <Col span={11} className={styles.row_fix}>
                <Form.Item
                    labelAlign={'left'}
                    name="basic_salary"
                    label={t("features.employee.features_add_new.salaryandwages.lable_input_basic_salary")}
                    rules={[{required: true, message: 'Basic Salary is required!' }]}
                >
                    <InputNumber prefix={configPrefix()} className="input_number"/>
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="audit_salary"
                    label={t("features.employee.features_add_new.salaryandwages.lable_input_audit_salary")}
                    rules={[{required: true, message: 'Audit Salary is required!' }]}
                >
                    <InputNumber min={"100%"} prefix={configPrefix()} className="input_number"/>
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="safety_insurance"
                    label={t("features.employee.features_add_new.salaryandwages.lable_input_safety_insurance")}
                    rules={[{required: true, message: 'Safety Insurance is required!' }]}
                >
                    <InputNumber prefix={configPrefix()} className="input_number"/>
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="health_insurance"
                    label={t("features.employee.features_add_new.salaryandwages.lable_input_health_insurance")}
                    rules={[{required: true, message: 'Health Insurance is required!' }]}
                >
                    <InputNumber prefix={configPrefix()} className="input_number"/>
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="meal_allowance"
                    label={t("features.employee.features_add_new.salaryandwages.lable_input_meal_allowance")}
                    rules={[{required: true, message: 'Meal Allowance is required!' }]}
                >
                    <InputNumber prefix={configPrefix()} className="input_number"/>
                </Form.Item>
            </Col>
        </Row>
    </Form>
);