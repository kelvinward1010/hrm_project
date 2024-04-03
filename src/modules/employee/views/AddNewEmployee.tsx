import { Col, Row, Typography, Tabs } from "antd";
import styles from "./Employee.module.scss";
import { useTranslation } from "react-i18next";
import type { TabsProps } from 'antd';
import { useState } from "react";
import { ButtonConfigAntd, TextLicense } from "@/components";

const { Text } = Typography;

export function AddNewEmployee() {

    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<string>("1");

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
        />
    }

    const items: TabsProps['items'] = [
        {
          key: '1',
          label: ConfigButtonTab("Employee Infomation", "1"),
          children: 'Content of Tab Pane 1',
        },
        {
          key: '2',
          label: ConfigButtonTab("Contract Information", "2"),
          children: 'Content of Tab Pane 2',
        },
        {
          key: '3',
          label: ConfigButtonTab("Employment Details", "3"),
          children: 'Content of Tab Pane 3',
        },
        {
            key: '4',
            label: ConfigButtonTab("Salary & Wages", "4"),
            children: 'Content of Tab Pane 4',
        },
        {
            key: '5',
            label: ConfigButtonTab("Others", "5"),
            children: 'Content other",'
        }
    ];

    const onChange = (key: string) => {
        setActiveTab(key);
    };

    return (
        <div className={styles.container}>
            <Row justify={'space-between'} align={'middle'}>
                <Col span={10}>
                    <Text className={styles.label_main}>{t("features.name")}</Text>
                </Col>
                <Col span={2}>
                    <ButtonConfigAntd
                        label={"Add"}
                        background="var(--button-color-dark-black)"
                        colorLabel="white"
                        height={40}
                        with="80px"
                        border="none"
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

            <TextLicense />
        </div>
    )
}
