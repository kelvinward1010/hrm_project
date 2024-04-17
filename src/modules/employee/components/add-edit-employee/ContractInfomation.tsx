import { TitleAll } from "./TitleAll";
import styles from "./ContractInfomation.module.scss";
import { useTranslation } from "react-i18next";
import { Button, Col, DatePicker, Form, Input, message, Row, Select, Table, TableColumnsType, Typography, Upload, UploadFile, UploadProps } from "antd";
import { ButtonConfigAntd } from "@/components";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { convertDateToYYYYMMDD, dataURLtoBlob, formatDate } from "@/utils/format";
import { LableInput } from "./LableInput";
import { useRecoilState } from "recoil";
import { isFilledContractInfomation } from "../../state/add-edit-employee/add.atom";
import { EMPLOYEE_TYPE_CONGIG } from "../../config";
import { FieldData } from "@/types";
import { useEffect, useRef, useState } from "react";
import { generateRandomNumberString } from "@/utils/string";
import { handleMapContracts } from "@/utils/data";
import { useParams } from "react-router-dom";

const dateFormat = 'YYYY/MM/DD';
const { Text } = Typography;

const allowedFileTypes = ['.jpg', '.png', '.gif', '.docx', '.xlsx', '.xls', '.doc', '.pdf'];

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

interface ContractInfomationProps {
    fields: FieldData[];
    setFields: any;
}

interface CustomizedFormProps {
    onChange: (fields: FieldData[]) => void;
    fields: FieldData[];
    t?: any;
    setFilledContractImportant: any;
}

export const ContractInfomation: React.FC<ContractInfomationProps> = ({
    fields,
    setFields
}) => {
    const [form] = Form.useForm();
    const idParams = useParams()?.id;
    const { t } = useTranslation();
    const [, setFilledContractImportant] = useRecoilState(isFilledContractInfomation);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    // const [image, setImage] = useState<any>(null);
    // const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [data, setData] = useState<any[]>([]);
    const [configField, setConfigField] = useState<FieldData[]>([
        { name: 'contract_date', value: '' },
        { name: 'name', value: '' },
    ]);

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

    // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     e.preventDefault();
    //     const files = e.target.files;
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //         setImage(reader.result as string);
    //     };
    //     if (files !== null && files.length) reader.readAsDataURL(files[0]);

    //     const filteredFileList = Array.from(files || []).filter((file: File) => {
    //         const fileExtension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
    //         return allowedFileTypes.includes(fileExtension);
    //     });

    //     const uploadFileList: UploadFile<any>[] = filteredFileList.map((file: File) => ({
    //         uid: file.name,
    //         name: file.name,
    //         status: 'done',
    //         url: URL.createObjectURL(file),
    //     }));

    //     setFileList(uploadFileList);

    //     if (filteredFileList.length === 0) {
    //         message.error('Please upload a valid file.');
    //     }
    // };

    // const handleButtonClick = () => {
    //     if (fileInputRef.current) {
    //       fileInputRef.current.click();
    //     }
    // };

    const onUploadFiles = () => {
        // const formData = new FormData();
        // formData.append('file', image);
        const dataconfig = [{
            contract_date: convertDateToYYYYMMDD(configField[0].value),
            name: configField[1].value,
            action: 'add',
            document_file: fileList[0],
            id: generateRandomNumberString(),
        }]
        const index = fields.findIndex((f: FieldData) => f.name == "contracts");
        if (index !== -1) {
            const take = fields[index].value;
            fields[index].value = [...take, ...dataconfig]
        }
        setFields(fields);
        setData(fields[index].value);
        setFileList([]);
        form.resetFields()
    };

    function hanleDeleteItemById(idToDelete: string) {
        const index = fields.findIndex((f: FieldData) => f.name == "contracts");
        if (index !== -1) {
            const take = fields[index].value;
            const updateData = take?.filter((item: any) => item.id !== idToDelete);
            fields[index].value = updateData
        }
        setFields(fields);
        setData(fields[index].value);
    };

    useEffect(() => {
        const contractItems: any = fields.find(item => item.name === 'contracts')?.value ?? [];
        setData(contractItems)
    }, [idParams]);

    const columns: TableColumnsType = [
        {
            title: LableInput({ label: t("features.employee.features_add_new.contract_infomation.contract.table.lable1") }),
            dataIndex: 'No',
            align: 'center',
            width: '10%',
            render: (_, __, index) => (
                <Text style={{ textAlign: "center" }}>{++index}</Text>
            ),
        },
        {
            title: LableInput({ label: t("features.employee.features_add_new.contract_infomation.contract.table.lable2") }),
            dataIndex: 'name',
            render: (text: any) => <Text className='line-clamp-1'>{text}</Text>,
            width: '30%',
        },
        {
            title: LableInput({ label: t("features.employee.features_add_new.contract_infomation.contract.table.lable3") }),
            dataIndex: 'contract_date',
            render: (text: any) => <Text className='line-clamp-1'>{formatDate(text)}</Text>,
            width: '30%',
        },
        {
            title: LableInput({ label: t("features.employee.features_add_new.contract_infomation.contract.table.lable4") }),
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
                        onClick={() => hanleDeleteItemById(record?.key)}
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
                    newFields.forEach((i: FieldData) => {
                        const index = fields.findIndex((f: FieldData) => f.name == i.name)
                        if (index !== -1) {
                            fields[index].value = i.value;
                        }
                    })
                    setFields(fields);
                }}
                t={t}
                setFilledContractImportant={setFilledContractImportant}
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
                <Row justify={'space-between'} wrap className={styles.contract_more}>
                    <Col span={7}>
                        <Form
                            form={form}
                            name="contract_information_actions"
                            {...formItemLayout}
                            onFieldsChange={(_, allFields) => {
                                setConfigField(allFields);
                            }}
                            className={styles.formmain}
                            autoComplete="off"
                        >
                            <Form.Item
                                labelAlign={'left'}
                                name="contract_date"
                                label={LableInput({ label: t("features.employee.features_add_new.contract_infomation.contract.contract_date") })}
                            >
                                <DatePicker
                                    format={dateFormat}
                                    placeholder="Select date"
                                    className={"date_picker"}
                                    size={'large'}
                                />
                            </Form.Item>
                            <Form.Item
                                labelAlign={'left'}
                                name="name"
                                label={LableInput({ label: t("features.employee.features_add_new.contract_infomation.contract.contract_name") })}
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
                                    {/* <Button 
                                        className={styles.button_upload_file} 
                                        onClick={handleButtonClick}
                                        icon={<UploadOutlined style={{ color: "var(--button-color-dark-blue)" }} />}
                                    >
                                        <input style={{display: 'none'}} ref={fileInputRef} type="file" onChange={handleFileChange} />
                                        {t("features.employee.features_add_new.contract_infomation.contract.lable_button_upload")}
                                    </Button> */}
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
                                        onClick={() => {
                                            onUploadFiles()
                                        }}
                                    />
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                    <Col span={16} style={{ minWidth: "400px" }}>
                        <Table
                            columns={columns}
                            dataSource={handleMapContracts(data)}
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

const CustomizedForm: React.FC<CustomizedFormProps> = ({ onChange, fields, t, setFilledContractImportant }) => (
    <Form
        name="contract_information"
        {...formItemLayout}
        fields={fields}
        onFieldsChange={(_, allFields) => {
            onChange(allFields);
            if (allFields[0].value !== null && allFields[1].value !== "") {
                setFilledContractImportant(true);
            } else {
                setFilledContractImportant(false);
            }
        }}
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
                    label={LableInput({ label: t("features.employee.features_add_new.contract_infomation.lable_input_date_start") })}
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
                    label={LableInput({ label: t("features.employee.features_add_new.contract_infomation.lable_input_employee_type") })}
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