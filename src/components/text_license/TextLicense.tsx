import { Col, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import styles from "./TextLicense.module.scss";

export function TextLicense() {
    const { t } = useTranslation();
    return (
        <Row justify={'center'} className={styles.container}>
            <Col>
                <Typography.Text>
                    {t("auth.cs")}
                </Typography.Text>
            </Col>
        </Row>
    )
}