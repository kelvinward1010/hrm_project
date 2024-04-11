import styles from "./Employee.module.scss";
import { DeleteOutlined, FileAddOutlined, SearchOutlined } from "@ant-design/icons";
import { Input } from "@mantine/core";
import { Col, Form, Row, Typography } from "antd";
import { TableEmployee } from "../components/TableEmployee";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { addnewemployeeUrl } from "@/routes/urls";
import { ButtonConfigAntd, TextLicense } from "@/components";
import { ModalDelete } from "../components/ModalDelete";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { deleteItemState } from "../state/table.state";
import { IEmployee } from "@/types/employee";


const { Text } = Typography;

export function Employee() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const isSelectedItem: boolean = useRecoilValue(deleteItemState);
    const [searchParams, setSearchParams] = useSearchParams();
    const [itemsSelected, setItemsSelected] = useState<IEmployee[]>([]);
    // const contentSearchParams = searchParams.get("searchContent");

    const handleChangeSearch = (value: string) => {
        searchParams.set("searchContent", value.trim());
        searchParams.delete("pageIndex");
        searchParams.delete("pageSize");
        setSearchParams(searchParams);
    };

    return (
        <>
            <div className={styles.container}>
                <Row justify={'space-between'} align={'middle'}>
                    <Col span={10}>
                        <Text className={styles.label_main}>{t("features.name")}</Text>
                    </Col>
                    <Col span={4}>
                        <Form>
                            <Input
                                onChange={(e) => handleChangeSearch(e.target.value)} 
                                placeholder="Search" 
                                leftSection={<SearchOutlined size={16} />}
                            />
                        </Form>
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
                                background={isSelectedItem ? "var(--button-color-light-black)" : "var(--button-color-light-crimson)"}
                                colorLabel={isSelectedItem ? "var(--button-color-dark-black)" : "var(--button-color-dark-crimson)"}
                                color={isSelectedItem ? "var(--button-color-dark-black)" : "var(--button-color-dark-crimson)"}
                                border="none"
                                fontSizeLabel={14}
                                fontWeightLabel={500}
                                leftIcon={<DeleteOutlined style={{ fontSize: "15px" }} />}
                                onClick={() => setIsOpenDelete(true)}
                                disabled={isSelectedItem}
                            />
                        </Col>
                    </Row>
                    <div className={styles.row_1} />
                    <TableEmployee setItemsSelected={setItemsSelected}/>
                </div>
                <TextLicense />
            </div>
            <ModalDelete
                isOpen={isOpenDelete}
                setIsOpen={setIsOpenDelete}
                itemsSelected={itemsSelected}
            />
        </>
    )
}