import { useTranslation } from "react-i18next";
import styles from "./Others.module.scss";
import { TitleAll } from "./TitleAll";
import { Col, Form, Input, Row, Select, Table, TableColumnsType, Typography, Upload, UploadFile, UploadProps } from "antd";
import { ButtonConfigAntd, ButtonDownLoad } from "@/components";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { convertDateToYYYYMMDD } from "@/utils/format";
import { useBenefits } from "../../api/getBenefits";
import { configValuesSelect, handleMapDocuments, hasDocumentWithId} from "@/utils/data";
import { FieldData, IBaseOption } from "@/types";
import { useEffect, useState } from "react";
import { generateRandomNumberString } from "@/utils/string";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { deleteIdsDocuments } from "../../state/add-edit-employee/add.atom";
import { DataDeleteIdsDocuments } from "../../state/add-edit-employee/add.state";
import { useGrades } from "../../api/getGrades";


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
    const idParams = useParams()?.id;
    const [data, setData] = useState<any[]>([]);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [,setDeleteIds] = useRecoilState(deleteIdsDocuments);
    const deleteIdsDcmt: string[] = useRecoilValue(DataDeleteIdsDocuments);
    const [isAdd, setIsAdd] = useState<boolean>(false);

    const configBenefit = configValuesSelect(useBenefits({})?.data);
    const configGrade = configValuesSelect(useGrades({})?.data);

    const onUploadFiles = () => {
        const currentDate: Date = new Date();
        const formData = new FormData();
        fileList.forEach((file: any) => {
            formData.append(
                "documents",
                file as unknown as Blob,
                file.name,
            );
        });
        const dataconfig = [{
            created_at: convertDateToYYYYMMDD(String(currentDate)),
            documents: fileList,
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
            setIsAdd(true);
            return false;
        },
        accept: '.jpg,.png,.gif,.docx,.xlsx,.xls,.doc,.pdf',
        fileList,
    };

    useEffect(() => {
        if(isAdd === true){
            onUploadFiles();
            setIsAdd(false);
        }
    },[fileList, isAdd])

    function hanleDeleteItemById(idToDelete: string) {
        const index = fields.findIndex((f: FieldData) => f.name == "documents");
        if (index !== -1) {
            const take = fields[index].value;
            const updateData = take?.filter((item: any) => item.id !== idToDelete);
            if(hasDocumentWithId(take, idToDelete)){
                setDeleteIds([...deleteIdsDcmt,...[idToDelete]])
            }
            fields[index].value = updateData
        }
        setFields(fields);
        setData(fields[index].value);
    };

    useEffect(() => {
        const documentsItems: any = fields.find(item => item.name === 'documents')?.value ?? [];
        setData(documentsItems)
    }, [idParams]);

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
            dataIndex: 'created_at',
            render: (text: any) => <Text className='line-clamp-1'>{text}</Text>,
            width: '30%',
        },
        {
            title: "Actions",
            width: '30%',
            align: 'center',
            render: (_: any, record: any) => {
                return (
                    <Row justify={'space-evenly'}>
                        {record?.url && <Col span={10}>
                            <ButtonDownLoad 
                                fileUrl={record?.url}
                                fileName={record?.documents}
                            />
                        </Col>}
                        <Col span={10}>
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
                        </Col>
                    </Row>
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