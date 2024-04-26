import { Col, Row, Typography, Tabs } from "antd";
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
import { IEditEmployee, IEmployee } from "../types";
import { useCreateEmployee } from "../api/createEmployee";
import { configValuesSelect, filterContracts, filterDocuments, transformValues } from "@/utils/data";
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
import { mapDataCreate, validateFieldsContractInfomation, validateFieldsEmployeeInfomation } from "../utils";

const { Text } = Typography;

export function AddEditEmployee() {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const idParams = useParams()?.id;
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

    // {idParams && useDetailEmployee({id: idParams, config: {
    //     onSuccess: (res) => {
    //         const data: IEditEmployee = res?.data;
    //         const mapdataFill1 = {
    //             name: data?.name,
    //             gender: data.gender,
    //             mother_name: data.mother_name,
    //             dob: dayjs(data?.dob, 'YYYY-MM-DD'),
    //             pob: data?.pob,
    //             ktp_no: data?.ktp_no,
    //             nc_id: data?.nc_id,
    //             home_address_1: data?.home_address_1,
    //             home_address_2: data?.home_address_2,
    //             mobile_no: data?.mobile_no,
    //             tel_no: data?.tel_no,
    //             marriage_id: data?.marriage_id,
    //             card_number: data?.card_number,
    //             bank_account_no: data?.bank_account_no,
    //             bank_name: data?.bank_name,
    //             family_card_number: data?.family_card_number,
    //             safety_insurance_no: data?.safety_insurance_no,
    //             health_insurance_no: data?.health_insurance_no,
    //         }
    //         form1.setFieldsValue(mapdataFill1);
    //         form2.setFieldsValue({
    //             contract_start_date: dayjs(data?.contract_start_date, 'YYYY-MM-DD'),
    //             type: data?.type,
    //         })
    //     }
    // }})}
    
    const [fields, setFields] = useState<FieldData[]>([
        {name: 'name', value: idParams ? dataDetailEmployee?.name : "" ,},
        {name: 'gender', value: idParams ? dataDetailEmployee?.gender : "",},
        {name: 'mother_name', value: idParams ? dataDetailEmployee?.mother_name : "",},
        {name: 'dob', value: idParams ? dayjs(dataDetailEmployee?.dob, 'YYYY-MM-DD') : "",},
        {name: 'pob', value: idParams ? dataDetailEmployee?.pob : "",},
        {name: 'ktp_no', value: idParams ? dataDetailEmployee?.ktp_no : "",},
        {name: 'nc_id', value: idParams ? dataDetailEmployee?.nc_id : "",},
        {name: 'home_address_1', value: idParams ? dataDetailEmployee?.home_address_1 : "",},
        {name: 'home_address_2', value: idParams ? dataDetailEmployee?.home_address_2 : "",},
        {name: 'mobile_no',value: idParams ? dataDetailEmployee?.mobile_no : "",},
        {name: 'tel_no',value: idParams ? dataDetailEmployee?.tel_no : "",},
        {name: 'marriage_id',value: idParams ? dataDetailEmployee?.marriage_id : "",},
        {name: 'card_number',value: idParams ? dataDetailEmployee?.card_number : "",},
        {name: 'bank_account_no',value: idParams ? dataDetailEmployee?.bank_account_no : "",},
        {name: 'bank_name',value: idParams ? dataDetailEmployee?.bank_name : "",},
        {name: 'family_card_number',value: idParams ? dataDetailEmployee?.family_card_number : "",},
        {name: 'safety_insurance_no',value: idParams ? dataDetailEmployee?.safety_insurance_no : "",},
        {name: 'health_insurance_no',value: idParams ? dataDetailEmployee?.health_insurance_no : "",},
        {name: 'contract_start_date', value: idParams ? dayjs(dataDetailEmployee?.contract_start_date, 'YYYY-MM-DD') : "",},
        {name: 'type', value: idParams ? dataDetailEmployee?.type : "",},
        {name: 'contracts', value: idParams ? dataDetailEmployee?.contracts : []},
        {name: 'department_id', value: idParams ? dataDetailEmployee?.department_id : "",},
        {name: 'position_id', value: idParams ? dataDetailEmployee?.position_id : "",},
        {name: 'shift', value: idParams ? dataDetailEmployee?.shift : "",},
        {name: 'basic_salary', value: idParams ? dataDetailEmployee?.basic_salary : "",},
        {name: 'audit_salary', value: idParams ? dataDetailEmployee?.audit_salary : "",},
        {name: 'safety_insurance', value: idParams ? dataDetailEmployee?.safety_insurance : "",},
        {name: 'health_insurance', value: idParams ? dataDetailEmployee?.health_insurance : "",},
        {name: 'meal_allowance', value: idParams ? dataDetailEmployee?.meal_allowance : "",},
        {name: 'grade_id', value: idParams ? dataDetailEmployee?.grade_id : "",},
        {name: 'benefits', value: idParams ? configValuesSelect(dataDetailEmployee?.benefits) : [],},
        {name: 'remark', value: idParams ? dataDetailEmployee?.remark : "",},
        {name: 'account_user_id', value: idParams ? dataDetailEmployee?.account_user_id : "",},
        {name: 'documents', value: idParams ? dataDetailEmployee?.documents : []},
        {name: 'hidden_on_payroll', value: idParams ? (dataDetailEmployee?.hidden_on_payroll == '' ? 0 : dataDetailEmployee?.hidden_on_payroll) : 0},
        {name: 'entitle_ot', value: idParams ? dataDetailEmployee?.entitle_ot : 0},
        {name: 'meal_allowance_paid', value: idParams ? dataDetailEmployee?.meal_allowance_paid : 0},
        {name: 'operational_allowance_paid', value: idParams ? dataDetailEmployee?.operational_allowance_paid : 1},
        {name: 'attendance_allowance_paid', value: idParams ? dataDetailEmployee?.attendance_allowance_paid : 1}
    ]);

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

    const checkValueImportantEmployeeInfomation = validateFieldsEmployeeInfomation(fields);
    const checkValueImportantContractInfomation = validateFieldsContractInfomation(fields);

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
        const configdata = transformValues(fields);
        const data: any = mapDataCreate(configdata);
        const finalData: IEmployee = {...data};
        configCreateEmployee.mutate(finalData);
    },[fields])

    const handleEditEmployee = useCallback(() => {
        const configdata = transformValues(fields);
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
          children: <EmployeeInfomation handleFormChange={handleFormChange} fields={fields} setFields={setFields}/>,
        },
        {
          key: '2',
          label: ConfigButtonTab(t("features.employee.features_add_new.tabs.tab2"), "2"),
          children: <ContractInfomation handleFormChange={handleFormChange} fields={fields} setFields={setFields} />,
        },
        {
          key: '3',
          label: ConfigButtonTab(t("features.employee.features_add_new.tabs.tab3"), "3"),
          children: <EmploymentDetails fields={fields} setFields={setFields}/>,
        },
        {
            key: '4',
            label: ConfigButtonTab(t("features.employee.features_add_new.tabs.tab4"), "4"),
            children: <SalaryAndWages fields={fields} setFields={setFields}/>,
        },
        {
            key: '5',
            label: ConfigButtonTab(t("features.employee.features_add_new.tabs.tab5"), "5"),
            children: <Others fields={fields} setFields={setFields}/>,
        }
    ];

    const onChange = (key: string) => {
        setActiveTab(key);
    };

    useEffect(() => {
        (isContractInfomation && isEmployeeInfomation && checkValueImportantEmployeeInfomation && checkValueImportantContractInfomation) ? setIsAddEmployee(false) : setIsAddEmployee(true);
        (isContractInfomation && isEmployeeInfomation) ? setIsEditEmployee(false) : setIsEditEmployee(true);
    },[isContractInfomation, isEmployeeInfomation, fields]);
    
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
