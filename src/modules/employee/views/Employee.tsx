import styles from "./Employee.module.scss";
import { DeleteOutlined, FileAddOutlined, SearchOutlined } from "@ant-design/icons";
import { Input } from "@mantine/core";
import { Col, Row, Typography } from "antd";
import { TableEmployee } from "../components/TableEmployee";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { addnewemployeeUrl } from "@/routes/urls";
import { ButtonConfigAntd, TextLicense } from "@/components";

const {Text} = Typography;

export function Employee() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <Row justify={'space-between'} align={'middle'}>
                <Col span={10}>
                    <Text className={styles.label_main}>{t("features.name")}</Text>
                </Col>
                <Col span={4}>
                    <Input placeholder="Search" leftSection={<SearchOutlined size={16} />} />
                </Col>
            </Row>
            <div className={styles.table_wrapper}>
                <Row justify={'space-between'} align={'middle'}>
                    <Col span={4} push={20} className={styles.actions}>
                        <ButtonConfigAntd
                            label={t("features.employee.lable_add")}
                            with="130px"
                            background="var(--button-color-light-blue)"
                            colorLabel="var(--button-color-dark-blue)"
                            color="var(--button-color-dark-blue)"
                            border="none"
                            fontSizeLabel={14}
                            fontWeightLabel={500}
                            leftIcon={<FileAddOutlined />}
                            onClick={() => navigate(addnewemployeeUrl)}
                        />
                        <ButtonConfigAntd                     
                            label={t("features.employee.lable_delete")}
                            with="130px"
                            background="var(--button-color-light-crimson)"
                            colorLabel="var(--button-color-dark-crimson)"
                            color="var(--button-color-dark-crimson)"
                            border="none"
                            fontSizeLabel={14}
                            fontWeightLabel={500}
                            leftIcon={<DeleteOutlined style={{fontSize: "15px"}}/>}
                        />
                    </Col>
                </Row>
                <div className={styles.row_1}/>
                <TableEmployee />
            </div>
            <TextLicense />
        </div>
    )
}