import { TitleAll } from "./TitleAll";
import styles from "./ContractInfomation.module.scss";
import { useTranslation } from "react-i18next";
import { Col, DatePicker, Form, Input, Row, Select, Table, TableColumnsType, Typography, Upload, UploadProps } from "antd";
import { useState } from "react";
import { Notification } from "@/components/notification/Notification";
import { EMPLOYEE_TYPE_CONGIG } from "../../types";
import { ButtonConfigAntd } from "@/components";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { formatDate } from "@/utils/format";
import { LableInput } from "./LableInput";

const dateFormat = 'YYYY/MM/DD';
const { Text } = Typography;

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

type FieldType = {
    contract_date: string;
    contract_name: string;
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


    const propsFile: UploadProps = {
        name: 'file',
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                console.log(`file uploaded successfully`);
            } else if (info.file.status === 'error') {
                console.log(`${info.file.name} file upload failed.`);
            }
        },
    };

    const onUploadFiles = (values: FieldType) => {
        console.log(values)
    }

    const columns: TableColumnsType = [
        {
            title: LableInput({label: t("features.employee.features_add_new.contract_infomation.contract.table.lable1")}),
            dataIndex: 'No',
            width: '10%',
        },
        {
            title: LableInput({label: t("features.employee.features_add_new.contract_infomation.contract.table.lable2")}),
            dataIndex: 'contract_name',
            render: (text: any) => <Text className='line-clamp-1'>{text}</Text>,
            width: '30%',
        },
        {
            title: LableInput({label: t("features.employee.features_add_new.contract_infomation.contract.table.lable3")}),
            dataIndex: 'contract_date',
            render: (text: any) => <Text className='line-clamp-1'>{formatDate(text)}</Text>,
            width: '30%',
        },
        {
            title: LableInput({label: t("features.employee.features_add_new.contract_infomation.contract.table.lable4")}),
            width: '30%',
            align: 'center',
            render: (_: any, record: any) => {
                return (
                    <ButtonConfigAntd
                        label="Delete"
                        background="var(--button-color-light-crimson)"
                        colorLabel="var(--button-color-dark-crimson)"
                        border="none"
                        fontSizeLabel={14}
                        fontWeightLabel={500}
                        height={40}
                        leftIcon={<DeleteOutlined style={{ color: "var(--button-color-dark-crimson)" }} />}
                    />
                )
            },
        }
    ];

    return (
        <div className={styles.container}>
            <TitleAll title={t("features.employee.features_add_new.titleall.title2")} />
            <CustomizedForm
                fields={fields}
                onChange={(newFields) => {
                    setFields(newFields);
                }}
                onSubmit={(values: any) => onFinish(values)}
                t={t}
            />
            <div className={styles.contract}>
                <Row className={styles.lable_cntrct}>
                    <Text className={styles.text}>
                        {t("features.employee.features_add_new.contract_infomation.contract.lable")}
                    </Text>
                </Row>
                <Row className={styles.lable_more}>
                    <Text className={styles.text}>
                        {t("features.employee.features_add_new.contract_infomation.contract.des_contract")}
                    </Text>
                </Row>
                <Row justify={'space-between'} className={styles.contract_more}>
                    <Col span={7}>
                        <Form
                            name="contract_information_actions"
                            {...formItemLayout}
                            onFinish={onUploadFiles}
                            className={styles.formmain}
                            autoComplete="off"
                        >
                            <Form.Item<FieldType>
                                labelAlign={'left'}
                                name="contract_date"
                                label={LableInput({label: t("features.employee.features_add_new.contract_infomation.contract.contract_date")})}
                            >
                                <DatePicker
                                    format={dateFormat}
                                    placeholder="Select date"
                                    className={"date_picker"}
                                    size={'large'}
                                />
                            </Form.Item>
                            <Form.Item<FieldType>
                                labelAlign={'left'}
                                name="contract_name"
                                label={LableInput({label: t("features.employee.features_add_new.contract_infomation.contract.contract_name")})}
                            >
                                <Input className="input_inside" />
                            </Form.Item>
                            <Row justify={'space-between'} wrap>
                                <Col span={11} style={{ minWidth: "210px" }}>
                                    <Upload {...propsFile}>
                                        <ButtonConfigAntd
                                            label={t("features.employee.features_add_new.contract_infomation.contract.lable_button_upload")}
                                            background="white"
                                            colorLabel="var(--button-color-dark-blue)"
                                            border="1px dashed var(--button-color-dark-blue)"
                                            fontSizeLabel={14}
                                            fontWeightLabel={500}
                                            height={40}
                                            minWidth="210px"
                                            leftIcon={<UploadOutlined style={{ color: "var(--button-color-dark-blue)" }} />}
                                        />
                                    </Upload>
                                </Col>
                                <Col span={11} style={{ minWidth: "210px" }}>
                                    <ButtonConfigAntd
                                        label={t("features.employee.features_add_new.contract_infomation.contract.lable_button_add")}
                                        background="var(--button-color-dark-teal)"
                                        colorLabel="white"
                                        border="none"
                                        fontSizeLabel={14}
                                        fontWeightLabel={500}
                                        height={40}
                                        htmlType={'submit'}
                                    />
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                    <Col span={16}>
                        <Table
                            columns={columns}
                            sticky
                            size={'small'}
                            className="table_all"
                            scroll={{
                                y: 400,
                                x: "auto"
                            }}
                        />
                    </Col>
                </Row>
            </div>
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
                    labelAlign={'left'}
                    name="contract_start_date"
                    label={LableInput({label: t("features.employee.features_add_new.contract_infomation.lable_input_date_start")})}
                    rules={[{ required: true, message: 'Date start is required!' }]}
                >
                    <DatePicker
                        format={dateFormat}
                        placeholder="Select date start"
                        className={"date_picker"}
                        size={'large'}
                    />
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="type"
                    label={LableInput({label: t("features.employee.features_add_new.contract_infomation.lable_input_employee_type")})}
                    rules={[{ required: true, message: 'Employee Type is required!' }]}
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