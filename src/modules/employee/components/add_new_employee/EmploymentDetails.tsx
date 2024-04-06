import { useTranslation } from "react-i18next";
import styles from "./EmploymentDetails.module.scss";
import { TitleAll } from "./TitleAll";
import { Checkbox, CheckboxProps, Col, Form, Row, Select } from "antd";
import { useState } from "react";
import { Notification } from "@/components/notification/Notification";
import { LableInput } from "./LableInput";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 9 },
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
    t?: any;
}

export function EmploymentDetails() {
    const { t } = useTranslation();
    const [fields, setFields] = useState<FieldData[]>([
        {
            name: ['department_id'], value: "",
        },
        {
            name: ['position_id'], value: "",
        },
        {
            name: ['shift'], value: "",
        },
    ]);

    const [formCheck, setFormCheck] = useState<any>({
        entitle_ot: 0,
        meal_allowance_paid: 0,
        operational_allowance_paid: 0,
        attendance_allowance_paid: 0,
    })

    const onFinish = (values: any) => {
        const data = {
            department_id: values.department_id,
            position_id: values.position_id,
        }
        Notification({
            message: "Created OK",
            type: "success",
        })
        console.log(data)
    }

    const handleChange: CheckboxProps['onChange'] = (e: any) => {
        setFormCheck({ ...formCheck, [e.target.name]: e.target.checked == true ? 1 : 0});
    };

    console.log(formCheck)

    return (
        <div className={styles.container}>
            <TitleAll title={t("features.employee.features_add_new.titleall.title3")} />
            <CustomizedForm
                fields={fields}
                onChange={(newFields) => {
                    setFields(newFields);
                }}
                onSubmit={(values: any) => onFinish(values)}
                t={t}
            />
            <Row>
                <Col span={24}>
                    <Checkbox name="entitle_ot" onChange={handleChange} className={styles.check}>
                        {t("features.employee.features_add_new.eploymentdetails.lable_input_entitle_ot")}
                    </Checkbox>
                </Col>
                <Col span={24}>
                    <Checkbox name="meal_allowance_paid" onChange={handleChange} className={styles.check}>
                        {t("features.employee.features_add_new.eploymentdetails.lable_input_meal_allowance_paid")}
                    </Checkbox>
                </Col>
                <Col span={24}>
                    <Checkbox name="operational_allowance_paid" onChange={handleChange} className={styles.check}>
                        {t("features.employee.features_add_new.eploymentdetails.lable_input_operational_allowance_paid")}
                    </Checkbox>
                </Col>
                <Col span={24}>
                    <Checkbox name="attendance_allowance_paid" onChange={handleChange} className={styles.check}>
                    {t("features.employee.features_add_new.eploymentdetails.lable_input_attendance_allowance_paid")}
                    </Checkbox>
                </Col>
            </Row>
        </div>
    )
}


const CustomizedForm: React.FC<CustomizedFormProps> = ({ onChange, fields, onSubmit, t }) => (
    <Form
        name="contract_information"
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
            <Col span={7} className={styles.row_fix}>
                <Form.Item
                    labelAlign={'left'}
                    name="department_id"
                    label={LableInput({label: t("features.employee.features_add_new.eploymentdetails.lable_input_department")})}
                >
                    <Select
                        options={[
                            {
                                value: "1",
                                label: "Quanlity Control"
                            }
                        ]}
                        placeholder="Select department"
                        className="select_fix"
                    />
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="position_id"
                    label={LableInput({label: t("features.employee.features_add_new.eploymentdetails.lable_input_position")})}
                >
                    <Select
                        options={[
                            {
                                value: "1",
                                label: "Sew Staff"
                            }
                        ]}
                        placeholder="Select position"
                        className="select_fix"
                    />
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="shift"
                    label={LableInput({label: t("features.employee.features_add_new.eploymentdetails.lable_input_shift")})}
                >
                    <Select
                        options={[
                            {
                                value: "1",
                                label: "1"
                            }
                        ]}
                        placeholder="Select shift"
                        className="select_fix"
                    />
                </Form.Item>
            </Col>
        </Row>
    </Form>
);