import { Col, Row, Typography, Tabs } from "antd";
import styles from "./Employee.module.scss";
import { useTranslation } from "react-i18next";
import type { TabsProps } from 'antd';
import { useEffect, useState } from "react";
import { ButtonConfigAntd, TextLicense } from "@/components";
import { 
    ContractInfomation, 
    EmployeeInfomation, 
    EmploymentDetails,
    Others,
    SalaryAndWages
} from "../components/add-new-employee";
import { useRecoilState, useRecoilValue } from "recoil";
import { addEmployeeState, filledContractInfomation, filledEmployeeInfomation } from "../state/add-new-employee/add.state";
import { InfoCircleOutlined } from "@ant-design/icons";
import { isAddEmplyee } from "../state/add-new-employee/add.atom";
import { FieldData } from "../types";

const { Text } = Typography;

export function AddNewEmployee() {

    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<string>("1");
    const [, setIsAddEmployee] = useRecoilState(isAddEmplyee);
    const isAddEmployee: boolean = useRecoilValue(addEmployeeState);
    const isEmployeeInfomation: boolean = useRecoilValue(filledEmployeeInfomation);
    const isContractInfomation: boolean = useRecoilValue(filledContractInfomation);
    const [fields, setFields] = useState<FieldData[]>([
        {name: ['name'], value: "",},
        {name: ['gender'], value: "",},
        {name: ['mother_name'], value: "",},
        {name: ['dob'], value: "",},
        {name: ['pob'], value: "",},
        {name: ['ktp_no'], value: "",},
        {name: ['nc_id'], value: "",},
        {name: ['home_address_1'], value: "",},
        {name: ['home_address_2'], value: "",},
        {name: ['mobile_no'],value: "",},
        {name: ['tel_no'],value: "",},
        {name: ['marriage_id'],value: "",},
        {name: ['card_number'],value: "",},
        {name: ['bank_account_no'],value: "",},
        {name: ['bank_name'],value: "",},
        {name: ['family_card_number'],value: "",},
        {name: ['safety_insurance_no'],value: "",},
        {name: ['health_insurance_no'],value: "",},
    ]);
    
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
            rightIcon={(isEmployeeInfomation === false && key == '1' || isContractInfomation === false && key == '2') ? <InfoCircleOutlined style={{color: "red", fontSize: "20px"}}/> : null}
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
          children: <ContractInfomation />,
        },
        {
          key: '3',
          label: ConfigButtonTab(t("features.employee.features_add_new.tabs.tab3"), "3"),
          children: <EmploymentDetails />,
        },
        {
            key: '4',
            label: ConfigButtonTab(t("features.employee.features_add_new.tabs.tab4"), "4"),
            children: <SalaryAndWages />,
        },
        {
            key: '5',
            label: ConfigButtonTab(t("features.employee.features_add_new.tabs.tab5"), "5"),
            children: <Others />,
        }
    ];

    const onChange = (key: string) => {
        setActiveTab(key);
    };

    
    useEffect(() => {
        if(isContractInfomation && isEmployeeInfomation) {
            setIsAddEmployee(false);
        }else{
            setIsAddEmployee(true);
        }
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
