import { useTranslation } from "react-i18next";
import styles from "./Others.module.scss";
import { TitleAll } from "./TitleAll";
import { Col, Form, Input, Row, Select } from "antd";
import { useState } from "react";
import { Notification } from "@/components/notification/Notification";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
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

export function Others() {
    const { t } = useTranslation();
    const [fields, setFields] = useState<FieldData[]>([
        {
            name: ['grade_id'], value: "",
        },
        {
            name: ['remark'], value: [],
        },
        {
            name: ['benefits'], value: "",
        },
        {
            name: ['account_user_id'], value: "",
        },
    ]);

    const onFinish = (values: any) => {
        const data = {
            grade_id: values.grade_id,
            remark: values.remark,
        }
        Notification({
            message: "Created OK",
            type: "success",
        })
        console.log(data)
    }

    return (
        <div className={styles.container}>
            <TitleAll title={t("features.employee.features_add_new.titleall.title5")}/>
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


const CustomizedForm: React.FC<CustomizedFormProps> = ({ onChange, fields, onSubmit, t }) => (
    <Form
        name="others"
        {...formItemLayout}
        fields={fields}
        onFieldsChange={(_, allFields) => {
            onChange(allFields);
        }}
        onFinish={onSubmit}
        className={styles.formmain}
        autoComplete="off"
    >
        <Row justify={'start'} wrap>
            <Col span={11} className={styles.row_fix}>
                <Form.Item
                    labelAlign={'left'}
                    name="grade_id"
                    label={t("features.employee.features_add_new.others.lable_input_grade")}
                >
                    <Select
                        options={[
                            {
                                value: "1",
                                label: "Grade A"
                            }
                        ]}
                        placeholder="Select grade"
                        className="select_fix"
                    />
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="remark"
                    label={t("features.employee.features_add_new.others.lable_input_remark")}
                >
                    <Select
                        mode="multiple"
                        allowClear
                        options={[
                            {
                                value: "1",
                                label: "Canteen Service 1"
                            },
                            {
                                value: "2",
                                label: "Canteen Service 2"
                            },
                        ]}
                        placeholder="Select remark"
                        className="select_muti"
                    />
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="benefits"
                    label={t("features.employee.features_add_new.others.lable_input_benefits")}
                >
                    <Input.TextArea className="input_inside"/>
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="account_user_id"
                    label={t("features.employee.features_add_new.others.lable_input_hrm_user_account")}
                >
                    <Select
                        options={[
                            {
                                value: "1",
                                label: "Select 1"
                            },
                            {
                                value: "2",
                                label: "Select 2"
                            },
                        ]}
                        placeholder="Select"
                        className="select_fix"
                    />
                </Form.Item>
            </Col>
        </Row>
    </Form>
);