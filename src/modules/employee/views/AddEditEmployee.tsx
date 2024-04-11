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
import { addEmployeeState, DataEmployeeDetail, filledContractInfomation, filledEmployeeInfomation } from "../state/add-edit-employee/add.state";
import { InfoCircleOutlined } from "@ant-design/icons";
import { isAddEmplyee } from "../state/add-edit-employee/add.atom";
import { FieldData } from "../types";
import { useCreateEmployee } from "../api/createEmployee";
import { mapDataCreate, validateFields } from "@/utils/data";
import { Notification } from "@/components/notification/Notification";
import { useNavigate, useParams } from "react-router-dom";
import { employeeUrl } from "@/routes/urls";

const { Text } = Typography;

export function AddEditEmployee() {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const idParams = useParams();
    const [activeTab, setActiveTab] = useState<string>("1");
    const [, setIsAddEmployee] = useRecoilState(isAddEmplyee);
    const isAddEmployee: boolean = useRecoilValue(addEmployeeState);
    const isEmployeeInfomation: boolean = useRecoilValue(filledEmployeeInfomation);
    const isContractInfomation: boolean = useRecoilValue(filledContractInfomation);
    const dataDetailEmployee: any = useRecoilState(DataEmployeeDetail);

    const [fields, setFields] = useState<FieldData[]>([
        {name: 'name', value: idParams ? dataDetailEmployee[0]?.name : "" ,},
        {name: 'gender', value: "",},
        {name: 'mother_name', value: "",},
        {name: 'dob', value: "",},
        {name: 'pob', value: "",},
        {name: 'ktp_no', value: "",},
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
        {name: 'department_id', value: "",},
        {name: 'position_id', value: "",},
        {name: 'shift', value: "",},
        {name: 'basic_salary', value: "",},
        {name: 'audit_salary', value: "",},
        {name: 'safety_insurance', value: "",},
        {name: 'health_insurance', value: "",},
        {name: 'meal_allowance', value: "",},
        {name: 'grade_id', value: "",},
        {name: 'benefits', value: [],},
        {name: 'remark', value: "",},
        {name: 'account_user_id', value: "",},
    ]);

    const [formCheck, setFormCheck] = useState<any>({
        hidden_on_payroll: 0,
        entitle_ot: 0,
        meal_allowance_paid: 0,
        operational_allowance_paid: 0,
        attendance_allowance_paid: 0,
    });

    const checkValueImportant = validateFields(fields);
    
    const handleCreateEmployee = useCallback(() => {
        const data: any = mapDataCreate(fields);
        const finalData = {...data, ...formCheck};
        useCreateEmployee(finalData).then((res) => {
            if(res?.result === true) {
                Notification({
                    message: "Successfully created employee",
                    type: "success",
                })
            }
            navigate(employeeUrl);
        }).catch((err) => {
            Notification({
                message: err.data?.message,
                type: "error",
            })
        });
    },[fields])
    
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
            rightIcon={((!isEmployeeInfomation && !checkValueImportant) && key == '1' || (!isContractInfomation && !checkValueImportant) && key == '2') ? <InfoCircleOutlined style={{color: "red", fontSize: "20px"}}/> : null}
        />
    }

    const items: TabsProps['items'] = [
        {
          key: '1',
          label: ConfigButtonTab(t("features.employee.features_add_new.tabs.tab1"), "1"),
          children: <EmployeeInfomation fields={fields} setFields={setFields}/>,
        },
        {
          key: '2',
          label: ConfigButtonTab(t("features.employee.features_add_new.tabs.tab2"), "2"),
          children: <ContractInfomation fields={fields} setFields={setFields} />,
        },
        {
          key: '3',
          label: ConfigButtonTab(t("features.employee.features_add_new.tabs.tab3"), "3"),
          children: <EmploymentDetails fields={fields} setFields={setFields} formCheck={formCheck} setFormCheck={setFormCheck}/>,
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
        (isContractInfomation && isEmployeeInfomation && checkValueImportant) ? setIsAddEmployee(false) : setIsAddEmployee(true);
    },[isContractInfomation, isEmployeeInfomation])

    return (
        <div className={styles.container}>
            <Row justify={'space-between'} align={'middle'}>
                <Col span={10}>
                    <Text className={styles.label_main}>{t("features.name")}</Text>
                </Col>
                <Col span={2}>
                    <ButtonConfigAntd
                        label={t("features.employee.features_add_new.lable_add")}
                        background={isAddEmployee ? "var(--button-color-dark-black)" : "var(--button-color-dark-blue)"}
                        colorLabel="white"
                        height={40}
                        with="auto"
                        border="none"
                        disabled={isAddEmployee}
                        onClick={handleCreateEmployee}
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
