import { Col, Row, Typography } from "antd";
import styles from "./TitleAll.module.scss";

const { Text } = Typography;

interface TitleAllProps{
    title?: any;
}

export function TitleAll(props: TitleAllProps) {
    return (
        <div className={styles.container}>
            <Row justify={'space-between'}>
                <Col span={10}>
                    <Text className={styles.title_main}>{props.title}</Text>
                </Col>
                <Col span={2}>
                    <Text>Required (<span className={styles.starx}>*</span>)</Text>
                </Col>
            </Row>

            <div className={styles.row_1}/>
        </div>
    )
}