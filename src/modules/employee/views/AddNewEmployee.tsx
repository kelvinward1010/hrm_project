import { Col, Row, Typography, Tabs } from "antd";
import styles from "./Employee.module.scss";
import { ButtonConfig } from "@/components";
import { useTranslation } from "react-i18next";
import type { TabsProps } from 'antd';

const { Text } = Typography;

export function AddNewEmployee() {

    const { t } = useTranslation();

    const items: TabsProps['items'] = [
        {
          key: '1',
          label: 'Tab 1',
          children: 'Content of Tab Pane 1',
        },
        {
          key: '2',
          label: 'Tab 2',
          children: 'Content of Tab Pane 2',
        },
        {
          key: '3',
          label: 'Tab 3',
          children: 'Content of Tab Pane 3',
        },
    ];

    const onChange = (key: string) => {
        console.log(key);
    };

    return (
        <div className={styles.container}>
            <Row justify={'space-between'} align={'middle'}>
                <Col span={10}>
                    <Text className={styles.label_main}>Employee Management</Text>
                </Col>
                <Col span={2}>
                    <ButtonConfig 
                        label={"Add"}
                        background="var(--button-color-dark-black)"
                        colorLabel="white"
                        height={40}
                        with="80px"
                    />
                </Col>
            </Row>

            <Tabs
                defaultActiveKey="1" 
                items={items} 
                onChange={onChange} 
            />

            <Row justify={'center'}>
                <Col>
                    <Text>
                        {t("auth.cs")}
                    </Text>
                </Col>
            </Row>
        </div>
    )
}
