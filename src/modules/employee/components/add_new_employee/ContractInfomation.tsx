import { TitleAll } from "./TitleAll";
import styles from "./ContractInfomation.module.scss";
import { useTranslation } from "react-i18next";
import { Col, DatePicker, Form, Row, Select } from "antd";
import { useState } from "react";
import { Notification } from "@/components/notification/Notification";
import { EMPLOYEE_TYPE_CONGIG } from "../../types";

const dateFormat = 'YYYY/MM/DD';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 },
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
    t?: any;
}

export function ContractInfomation() {
    const { t } = useTranslation();
    const [fields, setFields] = useState<FieldData[]>([
        {
            name: ['contract_start_date'], value: "",
        },
        {
            name: ['type'], value: "",
        },
    ]);

    const onFinish = (values: any) => {
        const data = {
            name: values.name,
            gender: values.gender,
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
            <TitleAll title={t("features.employee.features_add_new.titleall.title2")} />
            <CustomizedForm
                fields={fields}
                onChange={(newFields) => {
                    setFields(newFields);
                }}
                onFailure={(error: any) => onFinishFailed(error)}
                onSubmit={(values: any) => onFinish(values)}
                t={t}
            />
        </div>
    )
}

const CustomizedForm: React.FC<CustomizedFormProps> = ({ onChange, fields, onFailure, onSubmit, t }) => (
    <Form
        name="employee_information"
        {...formItemLayout}
        fields={fields}
        onFieldsChange={(_, allFields) => {
            onChange(allFields);
        }}
        onFinish={onSubmit}
        onFinishFailed={onFailure}
        initialValues={{
            "contract_start_date": fields.find(value => value?.value != null && value?.name == "contract_start_date")?.value,
            "type": fields.find(value => value?.value != null && value?.name == "type")?.value,
        }}
        className={styles.formmain}
        autoComplete="off"
    >
        <Row justify={'start'} wrap>
            <Col span={7} className={styles.row_fix}>
                <Form.Item
                    name="contract_start_date"
                    label={t("features.employee.features_add_new.contract_infomation.lable_input_date_start")}
                    rules={[{required: true, message: 'Date start is required!' }]}
                >
                    <DatePicker
                        format={dateFormat} 
                        placeholder="Select date start"
                        className={"date_picker"}
                        size={'large'}
                    />
                </Form.Item>
                <Form.Item
                    name="type"
                    label={t("features.employee.features_add_new.contract_infomation.lable_input_employee_type")}
                    rules={[{required: true, message: 'Employee Type is required!' }]}
                >
                    <Select
                        options={EMPLOYEE_TYPE_CONGIG}
                        placeholder="Select type"
                        className="select_fix"
                    />
                </Form.Item>
            </Col>
        </Row>
    </Form>
);