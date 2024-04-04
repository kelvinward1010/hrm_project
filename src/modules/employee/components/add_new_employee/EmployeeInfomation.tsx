import { TitleAll } from "./TitleAll";
import styles from "./EmployeeInfomation.module.scss";
import { useTranslation } from "react-i18next";
import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import { useState } from "react";
import { Notification } from "@/components/notification/Notification";
import { GENDER_CONFIG } from "../../types";


const dateFormat = 'YYYY/MM/DD';

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
            name: ['name'],
            value: "",
        },
        {
            name: ['gender'],
            value: "",
        },
        {
            name: ['mother_name'],
            value: "",
        },
        {
            name: ['dob'],
            value: "",
        },
        {
            name: ['pob'],
            value: "",
        },
        {
            name: ['mobile'],
            value: "",
        },
    ]);

    console.log(fields)

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
        name="add_new_employee"
        {...formItemLayout}
        fields={fields}
        onFieldsChange={(_, allFields) => {
            onChange(allFields);
        }}
        onFinish={onSubmit}
        onFinishFailed={onFailure}
        initialValues={{
            "name": fields.find(value => value?.value != null && value?.name == "name")?.value,
            "gender": fields.find(value => value?.value != null && value?.name == "gender")?.value,
            "mother_name": fields.find(value => value?.value != null && value?.name == "mother_name")?.value,
            "dob": fields.find(value => value?.value != null && value?.name == "dob")?.value,
            "pob": fields.find(value => value?.value != null && value?.name == "pob")?.value,
            "mobile": fields.find(value => value?.value != null && value?.name == "mobile")?.value,
        }}
        className={styles.formmain}
        autoComplete="off"
    >
        <Row justify={'space-between'}>
            <Col span={11}>
                <Form.Item
                    name="name"
                    label="Name :"
                    rules={[{required: true, message: 'Name is required!' }]}
                >
                    <Input className="input_inside"/>
                </Form.Item>
                <Form.Item
                    name="gender"
                    label="Gender :"
                    rules={[{required: true, message: 'Gender is required!' }]}
                >
                    <Select
                        options={GENDER_CONFIG}
                        placeholder="Choose Gender"
                        className="select_fix"
                    />
                </Form.Item>
                <Form.Item
                    name="mother_name"
                    label="Mother name :"
                >
                    <Input className="input_inside"/>
                </Form.Item>
                <Form.Item
                    name="dob"
                    label="Date of birth :"
                    rules={[{required: true, message: 'Date of birth is required!' }]}
                >
                    <DatePicker
                        format={dateFormat} 
                        placeholder="Select day of birth"
                        className={"date_picker"}
                    />
                </Form.Item>
                <Form.Item
                    name="pob"
                    label="Place of birth :"
                >
                    <Input className="input_inside"/>
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    name="mobile"
                    label="Mobile No :"
                >
                    <Input className="input_inside"/>
                </Form.Item>
            </Col>
        </Row>
    </Form>
);