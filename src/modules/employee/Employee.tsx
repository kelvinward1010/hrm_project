import styles from "./Employee.module.scss";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "@mantine/core";
import { Col, Row, Typography } from "antd";

const {Text} = Typography;

export function Employee() {
    return (
        <div className={styles.container}>
            <Row justify={'space-between'} align={'middle'}>
                <Col span={10}>
                    <Text className={styles.label_main}>Employee Management</Text>
                </Col>
                <Col span={5}>
                    <Input placeholder="Search" leftSection={<SearchOutlined size={16} />} />
                </Col>
            </Row>
        </div>
    )
}