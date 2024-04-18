import { useTranslation } from "react-i18next";
import styles from "./Others.module.scss";
import { TitleAll } from "./TitleAll";
import { Col, Form, Input, Row, Select, Table, TableColumnsType, Typography, Upload, UploadFile, UploadProps } from "antd";
import { ButtonConfigAntd } from "@/components";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { convertDateToYYYYMMDD, formatDate } from "@/utils/format";
import { useQuery } from "react-query";
import { useGetBenefits } from "../../api/getBenefits";
import { configValuesSelect, handleMapDocuments } from "@/utils/data";
import { useGetGrades } from "../../api/getGrades";
import { FieldData, IBaseOption } from "@/types";
import { useState } from "react";
import { generateRandomNumberString } from "@/utils/string";


const { Text } = Typography;

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

interface OthersProps{
    fields: FieldData[];
    setFields: any;
}

interface CustomizedFormProps {
    onChange: (fields: FieldData[]) => void;
    fields: FieldData[];
    t?: any;
    configBenefit: IBaseOption[];
    configGrade: IBaseOption[];
}

export const Others: React.FC<OthersProps> = ({
    fields,
    setFields
}) => {
    const { t } = useTranslation();
    const [data, setData] = useState<any[]>([]);
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const {data: benefit} = useQuery({
        queryKey: 'benefit',
        queryFn: () => useGetBenefits()
    })

    const {data: grade} = useQuery({
        queryKey: 'grade',
        queryFn: () => useGetGrades()
    })

    const configBenefit = configValuesSelect(benefit);
    const configGrade = configValuesSelect(grade);

    const onUploadFiles = () => {
        const currentDate: Date = new Date();
        const dataconfig = [{
            date: convertDateToYYYYMMDD(String(currentDate)),
            documents: fileList[0],
            id: generateRandomNumberString(),
        }]
        const index = fields.findIndex((f: FieldData) => f.name == "documents");
        if (index !== -1) {
            const take = fields[index].value;
            fields[index].value = [...take, ...dataconfig]
        }
        setFields(fields);
        setData(fields[index].value);
        setFileList([]);
    };

    const propsFile: UploadProps = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);
            return false;
        },
        fileList,
    };

    function hanleDeleteItemById(idToDelete: string) {
        const index = fields.findIndex((f: FieldData) => f.name == "documents");
        if (index !== -1) {
            const take = fields[index].value;
            const updateData = take?.filter((item: any) => item.id !== idToDelete);
            fields[index].value = updateData
        }
        setFields(fields);
        setData(fields[index].value);
    };

    const columns: TableColumnsType = [
        {
            title: "No",
            dataIndex: 'No',
            width: '10%',
            render: (_, __, index) => (
                <Text style={{ textAlign: "center" }}>{++index}</Text>
            ),
        },
        {
            title: "Document Name",
            dataIndex: 'documents',
            render: (text: any) => <Text className='line-clamp-1'>{text}</Text>,
            width: '30%',
        },
        {
            title: "Create At",
            dataIndex: 'date',
            render: (text: any) => <Text className='line-clamp-1'>{formatDate(text)}</Text>,
            width: '30%',
        },
        {
            title: "Actions",
            width: '30%',
            align: 'center',
            render: (_: any, record: any) => {
                return (
                    <ButtonConfigAntd
                        background="var(--button-color-light-crimson)"
                        colorLabel="var(--button-color-dark-crimson)"
                        border="none"
                        fontSizeLabel={14}
                        fontWeightLabel={500}
                        height={40}
                        onClick={() => hanleDeleteItemById(record?.key)}
                        leftIcon={<DeleteOutlined style={{ color: "var(--button-color-dark-crimson)" }} />}
                    />
                )
            },
        }
    ];

    return (
        <div className={styles.container}>
            <TitleAll title={t("features.employee.features_add_new.titleall.title5")}/>
            <CustomizedForm
                fields={fields}
                onChange={(newFields) => {
                    newFields.forEach((i: FieldData) => {
                        const index = fields.findIndex((f: FieldData) => f.name == i.name)
                        if(index !== -1){
                            fields[index].value = i.value;
                        }
                    })
                    setFields(fields);
                }}
                t={t}
                configBenefit={configBenefit}
                configGrade={configGrade}
            />
            <div className={styles.table_main}>
                <Row align={'middle'}>
                    <Col span={4}>
                        Document:
                    </Col>
                    <Col span={4}>
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
                                m="0 0 0 -33px"
                                leftIcon={<UploadOutlined style={{ color: "var(--button-color-dark-blue)" }} />}
                            />
                        </Upload>
                    </Col>
                </Row>
                <Table
                    columns={columns}
                    dataSource={handleMapDocuments(data)}
                    sticky
                    size={'small'}
                    className="table_all"
                    scroll={{
                        y: 400,
                        x: "auto"
                    }}
                />
            </div>
        </div>
    )
}


const CustomizedForm: React.FC<CustomizedFormProps> = ({ onChange, fields, t, configBenefit, configGrade }) => (
    <Form
        name="others"
        {...formItemLayout}
        fields={fields}
        onFieldsChange={(_, allFields) => {
            onChange(allFields);
        }}
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
                        options={configGrade}
                        placeholder="Select grade"
                        className="select_fix"
                    />
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="benefits"
                    label={t("features.employee.features_add_new.others.lable_input_remark")}
                >
                    <Select
                        mode="multiple"
                        allowClear
                        options={configBenefit}
                        placeholder="Select remark"
                        className="select_muti"
                    />
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="remark"
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