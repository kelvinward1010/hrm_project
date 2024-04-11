import { useTranslation } from "react-i18next";
import styles from "./SalaryAndWages.module.scss";
import { TitleAll } from "./TitleAll";
import { Col, Form, InputNumber, Row, Typography } from "antd";
import { FieldData } from "../../types";

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

interface SalaryAndWagesProps{
    fields: FieldData[];
    setFields: any;
}
interface CustomizedFormProps {
    onChange: (fields: FieldData[]) => void;
    fields: FieldData[];
    t?: any;
}

export const SalaryAndWages: React.FC<SalaryAndWagesProps> = ({
    fields,
    setFields
}) => {
    const { t } = useTranslation();

    return (
        <div className={styles.container}>
            <TitleAll title={t("features.employee.features_add_new.titleall.title4")}/>
            <CustomizedForm
                fields={fields}
                onChange={(newFields) => {
                    setFields(newFields);
                }}
                t={t}
            />
        </div>
    )
}

const configPrefix = () => {
    return <Text style={{color: "var(--text-color-blue)"}}>Rp</Text>
}

const CustomizedForm: React.FC<CustomizedFormProps> = ({ onChange, fields, t }) => (
    <Form
        name="Salaryandwages"
        {...formItemLayout}
        fields={fields}
        onFieldsChange={(_, allFields) => {
            onChange(allFields);
        }}
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