import { Col, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";

export function TextLicense() {
    const { t } = useTranslation();
    return (
        <Row justify={'center'}>
            <Col>
                <Typography.Text>
                    {t("auth.cs")}
                </Typography.Text>
            </Col>
        </Row>
    )
}