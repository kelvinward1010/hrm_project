import { Col, Row, Typography, Tabs, Form } from "antd";
import styles from "./Employee.module.scss";
import { useTranslation } from "react-i18next";
import type { TabsProps } from 'antd';
import { useCallback, useEffect, useState } from "react";
import { ButtonConfigAntd, TextLicense } from "@/components";
import { 
    ContractInfomation, 
    EmployeeInfomation, 
    EmploymentDetails,
    Others,
    SalaryAndWages
} from "../components/add-edit-employee";
import { useRecoilState, useRecoilValue } from "recoil";
import { addEmployeeState, DataDeleteIdsContracts, DataDeleteIdsDocuments, editEmployeeState, filledContractInfomation, filledEmployeeInfomation } from "../state/add-edit-employee/add.state";
import { InfoCircleOutlined } from "@ant-design/icons";
import { deleteIdsContracts, deleteIdsDocuments, isAddEmplyee, isEditEmplyee, isFilledContractInfomation, isFilledEmployeeInfomation, } from "../state/add-edit-employee/add.atom";
import { IEditEmployee} from "../types";
import { useCreateEmployee } from "../api/createEmployee";
import { configValuesSelect, filterContracts, filterDocuments } from "@/utils/data";
import { Notification } from "@/components/notification/Notification";
import { useNavigate, useParams } from "react-router-dom";
import { employeeUrl } from "@/routes/urls";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import dayjs from "dayjs";
import { FieldData } from "@/types";
import { useUpdateEmployee } from "../api/updateEmployee";
import { useUploadDocuments } from "../api/uploadDocument";
import { useContractSaveMultiple } from "../api/uploadMutiplefile";
import { mapDataCreate, transformValues, validateFieldsContractInfomation, validateFieldsEmployeeInfomation } from "../utils";
import { useDetailEmployee } from "../api/getDetailEmployee";

const { Text } = Typography;

export function AddEditEmployee() {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const idParams = useParams()?.id;
    const [formEmployeeInfo] = Form.useForm();
    const [formContractInfo] = Form.useForm();
    const [formEployeeDetail] = Form.useForm();
    const [formSalaryAndWages] = Form.useForm();
    const [formOthers] = Form.useForm();
    const [activeTab, setActiveTab] = useState<string>("1");
    const [, setIsAddEmployee] = useRecoilState(isAddEmplyee);
    const isAddEmployee: boolean = useRecoilValue(addEmployeeState);
    const [, setIsEditEmployee] = useRecoilState(isEditEmplyee);
    const isEditEmployee: boolean = useRecoilValue(editEmployeeState);
    const isEmployeeInfomation: boolean = useRecoilValue(filledEmployeeInfomation);
    const isContractInfomation: boolean = useRecoilValue(filledContractInfomation);
    const dataDetailEmployee: any = useSelector((state: RootState) => state.employee.employee);
    const [, setFilledInformationImportant] = useRecoilState(isFilledEmployeeInfomation);
    const [, setFilledContractImportant] = useRecoilState(isFilledContractInfomation);
    const [,setDeleteIds] = useRecoilState(deleteIdsDocuments);
    const deleteIdsDcmt: string[] = useRecoilValue(DataDeleteIdsDocuments);
    const [,setDeleteCntIds] = useRecoilState(deleteIdsContracts);
    const deleteIdsCnts: string[] = useRecoilValue(DataDeleteIdsContracts);
    
    const [fields, setFields] = useState<FieldData[]>([
        {name: 'name', value: "" ,},
        {name: 'gender', value: "",},
        {name: 'mother_name', value: "",},
        {name: 'dob', value:  "",},
        {name: 'pob', value:  "",},
        {name: 'ktp_no', value:  "",},
        {name: 'nc_id', value: "",},
        {name: 'home_address_1', value: "",},
        {name: 'home_address_2', value: "",},
        {name: 'mobile_no',value: "",},
        {name: 'tel_no',value: "",},
        {name: 'marriage_id',value: "",},
        {name: 'card_number',value: "",},
        {name: 'bank_account_no',value: "",},
        {name: 'bank_name',value: "",},
        {name: 'family_card_number',value: "",},
        {name: 'safety_insurance_no',value: "",},
        {name: 'health_insurance_no',value: "",},
        {name: 'contract_start_date', value: "",},
        {name: 'type', value: "",},
        {name: 'contracts', value: idParams ? dataDetailEmployee?.contracts : []},
        {name: 'department_id', value: "",},
        {name: 'position_id', value: "",},
        {name: 'shift', value: "",},
        {name: 'hidden_on_payroll', value: 0},
        {name: 'entitle_ot', value: 0},
        {name: 'meal_allowance_paid', value: 0},
        {name: 'operational_allowance_paid', value: 1},
        {name: 'attendance_allowance_paid', value: 1},
        {name: 'basic_salary', value:  "",},
        {name: 'audit_salary', value: "",},
        {name: 'safety_insurance', value: "",},
        {name: 'health_insurance', value: "",},
        {name: 'meal_allowance', value: "",},
        {name: 'grade_id', value: "",},
        {name: 'benefits', value: [],},
        {name: 'remark', value: "",},
        {name: 'account_user_id', value: "",},
        {name: 'documents', value: idParams ? dataDetailEmployee?.documents : []},
    ]);

    {idParams && useDetailEmployee({id: idParams, config: {
        onSuccess: (res) => {
            const data: IEditEmployee = res?.data;
            const datahidden = data?.hidden_on_payroll == '' ? 0 : data?.hidden_on_payroll;
            if(!data) return;
            formEmployeeInfo?.setFieldsValue({
                name: data?.name,
                gender: data.gender,
                mother_name: data.mother_name,
                dob: dayjs(data?.dob, 'YYYY-MM-DD'),
                pob: data?.pob,
                ktp_no: data?.ktp_no,
                nc_id: data?.nc_id,
                home_address_1: data?.home_address_1,
                home_address_2: data?.home_address_2,
                mobile_no: data?.mobile_no,
                tel_no: data?.tel_no,
                marriage_id: data?.marriage_id,
                card_number: data?.card_number,
                bank_account_no: data?.bank_account_no,
                bank_name: data?.bank_name,
                family_card_number: data?.family_card_number,
                safety_insurance_no: data?.safety_insurance_no,
                health_insurance_no: data?.health_insurance_no,
            });
            formContractInfo?.setFieldsValue({
                contract_start_date: dayjs(data?.contract_start_date, 'YYYY-MM-DD'),
                type: data?.type,
            });
            formEployeeDetail?.setFieldsValue({
                department_id: data?.department_id,
                position_id: data?.position_id,
                shift: data?.shift,
                hidden_on_payroll: datahidden,
                entitle_ot: data?.entitle_ot,
                meal_allowance_paid: data?.meal_allowance_paid,
                operational_allowance_paid: data?.operational_allowance_paid,
                attendance_allowance_paid: data?.attendance_allowance_paid,
            });
            formSalaryAndWages?.setFieldsValue({
                basic_salary: data?.basic_salary,
                audit_salary: data?.audit_salary,
                safety_insurance: data?.safety_insurance,
                health_insurance: data?.health_insurance,
                meal_allowance: data?.meal_allowance,
            });
            formOthers?.setFieldsValue({
                grade_id: data?.grade_id,
                benefits: configValuesSelect(data?.benefits),
                remark: data?.remark,
                account_user_id: data?.account_user_id,
            });
        }
    }})};

    const handleFormChange = (_: any, allValues: any) => {
        if(allValues?.name !== '' && allValues?.gender !== '' && allValues?.dob !== null && allValues?.ktp_no !== ''){
            setFilledInformationImportant(true);
        }else{
            setFilledInformationImportant(false);
        }
        if (allValues?.contract_start_date !== null && allValues?.type !== "") {
            setFilledContractImportant(true);
        } else {
            setFilledContractImportant(false);
        }
    };

    const checkValueImportantEmployeeInfomation = validateFieldsEmployeeInfomation(formEmployeeInfo?.getFieldsValue());
    const checkValueImportantContractInfomation = validateFieldsContractInfomation(formContractInfo?.getFieldsValue());

    const configUploadDocuments = useUploadDocuments({});
    const configContractSaveMultiple = useContractSaveMultiple({});

    const configCreateEmployee = useCreateEmployee({
        config:{
            onSuccess: (res) => {
                Notification({
                    message: "Successfully created employee",
                    type: "success",
                })
                const indexDocuments = fields.findIndex((f: FieldData) => f.name == "documents");
                const indexContracts = fields.findIndex((f: FieldData) => f.name == "contracts");
                const dcmts = fields[indexDocuments].value;
                const cnts = fields[indexContracts].value;
                const dataUploads = filterDocuments(dcmts);
                const mapData = filterContracts(cnts, String(idParams), deleteIdsCnts);
                if(dataUploads?.length > 0 || deleteIdsDcmt?.length > 0) {
                    const convertDocumentsUpload = {
                        employee_id: res?.id,
                        deleted_ids: deleteIdsDcmt,
                        documents: dataUploads,
                    }
                    configUploadDocuments.mutate(convertDocumentsUpload)
                }
                if(mapData?.documents?.length > 0 || deleteIdsCnts?.length > 0) {
                    configContractSaveMultiple.mutate(mapData)
                }
                setDeleteCntIds([]);
                setDeleteIds([]);
                navigate(employeeUrl);
            },
            onError: (err: any) => {
                Notification({
                    message: err.data?.message,
                    type: "error",
                })
            }
        }
    })

    const configEditEmployee = useUpdateEmployee({
        config:{
            onSuccess: () => {
                Notification({
                    message: "Successfully update employee",
                    type: "success",
                })
                const indexDocuments = fields.findIndex((f: FieldData) => f.name == "documents");
                const indexContracts = fields.findIndex((f: FieldData) => f.name == "contracts");
                const dcmts = fields[indexDocuments].value;
                const cnts = fields[indexContracts].value;
                const dataUploads = filterDocuments(dcmts);
                const mapData = filterContracts(cnts, String(idParams), deleteIdsCnts);
                if(dataUploads?.length > 0 || deleteIdsDcmt?.length > 0) {
                    const convertDocumentsUpload = {
                        employee_id: idParams,
                        deleted_ids: deleteIdsDcmt,
                        documents: dataUploads,
                    }
                    configUploadDocuments.mutate(convertDocumentsUpload)
                }
                if(mapData?.documents?.length > 0 || deleteIdsCnts?.length > 0) {
                    configContractSaveMultiple.mutate(mapData)
                }
                setDeleteCntIds([]);
                setDeleteIds([])
                navigate(employeeUrl);
            },
            onError: (err: any) => {
                Notification({
                    message: err.data?.message,
                    type: "error",
                })
            }
        }
    });

    const handleCreateEmployee = useCallback(() => {
        const dataEmployeeInfo: any = formEmployeeInfo?.getFieldsValue();
        const dataContractInfo: any = formContractInfo?.getFieldsValue();
        const dataEmployeeDetail: any = formEployeeDetail?.getFieldsValue();
        const dataSalaryAndWages: any = formSalaryAndWages?.getFieldsValue();
        const dataOthers: any = formOthers?.getFieldsValue();
        const wrapData = {
            ...dataEmployeeInfo,
            ...dataContractInfo,
            ...dataEmployeeDetail, 
            ...dataSalaryAndWages,
            ...dataOthers,
        }
        const configdata = transformValues(wrapData);
        const data: any = mapDataCreate(configdata);
        const finalData: IEditEmployee = {...data};
        configCreateEmployee.mutate(finalData);
    },[fields]);
    
    const handleEditEmployee = useCallback(() => {
        const dataEmployeeInfo: any = formEmployeeInfo?.getFieldsValue();
        const dataContractInfo: any = formContractInfo?.getFieldsValue();
        const dataEmployeeDetail: any = formEployeeDetail?.getFieldsValue();
        const dataSalaryAndWages: any = formSalaryAndWages?.getFieldsValue();
        const dataOthers: any = formOthers?.getFieldsValue();
        const wrapData = {
            ...dataEmployeeInfo,
            ...dataContractInfo,
            ...dataEmployeeDetail, 
            ...dataSalaryAndWages,
            ...dataOthers,
        }
        const configdata = transformValues(wrapData);
        const data: any = mapDataCreate(configdata);
        const finalData: IEditEmployee = {...data,...{id: idParams}};
        configEditEmployee.mutate(finalData);
    },[fields, deleteIdsDcmt]);
    

    const ConfigButtonTab = (label: string, key: string) => {
        return <ButtonConfigAntd
            label={label}
            background={activeTab === key ? "var(--button-color-dark-blue)" : "var(--button-color-light-blue)"}
            colorLabel={activeTab === key ? "white" : "var(--button-color-dark-blue)"}
            fontWeightLabel={500}
            fontSizeLabel={"14px"}
            height={45}
            border="none"
            padding="5px 30px"
            rightIcon={((!isEmployeeInfomation || !checkValueImportantEmployeeInfomation) && key == '1' || (!isContractInfomation || !checkValueImportantContractInfomation) && key == '2') ? <InfoCircleOutlined style={{color: "red", fontSize: "20px", marginLeft: "6px"}}/> : null}
        />
    }
    
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: ConfigButtonTab(t("features.employee.features_add_new.tabs.tab1"), "1"),
            children: <EmployeeInfomation form={formEmployeeInfo} handleFormChange={handleFormChange} fields={fields} setFields={setFields}/>,
            forceRender: true,
        },
        {
            key: '2',
            label: ConfigButtonTab(t("features.employee.features_add_new.tabs.tab2"), "2"),
            children: <ContractInfomation form_main={formContractInfo} handleFormChange={handleFormChange} fields={fields} setFields={setFields} />,
            forceRender: true,
        },
        {
            key: '3',
            label: ConfigButtonTab(t("features.employee.features_add_new.tabs.tab3"), "3"),
            children: <EmploymentDetails form={formEployeeDetail} fields={fields} setFields={setFields}/>,
            forceRender: true,
        },
        {
            key: '4',
            label: ConfigButtonTab(t("features.employee.features_add_new.tabs.tab4"), "4"),
            children: <SalaryAndWages form={formSalaryAndWages} fields={fields} setFields={setFields}/>,
            forceRender: true,
        },
        {
            key: '5',
            label: ConfigButtonTab(t("features.employee.features_add_new.tabs.tab5"), "5"),
            children: <Others form={formOthers} fields={fields} setFields={setFields}/>,
            forceRender: true,
        }
    ];

    const onChange = (key: string) => {
        setActiveTab(key);
    };

    useEffect(() => {
        (isContractInfomation && isEmployeeInfomation && checkValueImportantEmployeeInfomation && checkValueImportantContractInfomation) ? setIsAddEmployee(false) : setIsAddEmployee(true);
        (isContractInfomation && isEmployeeInfomation) ? setIsEditEmployee(false) : setIsEditEmployee(true);
    },[isContractInfomation, isEmployeeInfomation, fields, checkValueImportantEmployeeInfomation, checkValueImportantContractInfomation]);
    
    useEffect(() => {
        if(!idParams){
            setFilledContractImportant(false);
            setFilledInformationImportant(false);
        }else{
            setFilledContractImportant(true);
            setFilledInformationImportant(true);
        }
    },[dataDetailEmployee, idParams]);

    return (
        <div className={styles.container}>
            <Row justify={'space-between'} align={'middle'}>
                <Col span={10}>
                    <Text className={styles.label_main}>{t("features.name")}</Text>
                </Col>
                <Col span={2}>
                    <ButtonConfigAntd
                        label={idParams ? t("features.employee.features_add_new.lable_save_change") : t("features.employee.features_add_new.lable_add")}
                        background={isAddEmployee ? "var(--button-color-dark-black)" : "var(--button-color-dark-blue)"}
                        colorLabel="white"
                        height={40}
                        with="auto"
                        border="none"
                        disabled={idParams ? isEditEmployee : isAddEmployee}
                        onClick={idParams ? handleEditEmployee : handleCreateEmployee}
                    />
                </Col>
            </Row>

            <div className={styles.tabs_main}>
                <Tabs
                    defaultActiveKey="1" 
                    items={items} 
                    onChange={onChange} 
                />
            </div>

            <TextLicense/>
        </div>
    )
}
