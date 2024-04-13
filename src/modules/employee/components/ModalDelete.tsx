import { ButtonConfigAntd } from "@/components";
import { Col, Modal, Row, Typography } from "antd";
import { useCallback } from "react";
import { useDeleteMultipleEmployees } from "../api/deleteMultipleEmployees";
import { getIdsItemsEmployee } from "@/utils/data";
import { Notification } from "@/components/notification/Notification";
import { IEmployeeTable } from "../types";

interface ModalDeleteProps {
    isOpen?: boolean;
    setIsOpen?: any;
    itemsSelected: IEmployeeTable[];
}

const { Text } = Typography;

export function ModalDelete(props: ModalDeleteProps) {

    const handleMultipleDeleteEmployees = useCallback(() => {
        const data = {
            record_ids: getIdsItemsEmployee(props.itemsSelected)
        }
        useDeleteMultipleEmployees(data).then((res: any) => {
            if(res?.result === true) {
                Notification({
                    message: "Successfully deleted",
                    type: "success",
                })
            }
            props.setIsOpen(false);
        }).catch((err: any) =>{
            Notification({
                message: err.data?.message,
                type: "error",
            })
        })
    },[props.itemsSelected])
    
    return (
        <Modal
            title={`Delete`}
            open={props.isOpen}
            onCancel={() => props.setIsOpen(false)}
            width={300}
            className="ant_modal"
            footer={null}
            centered
        >
            <Text>Are you sure you want to delete?</Text>
            <Row justify={'space-between'} style={{marginTop: "30px"}}>
                <Col span={11}>
                    <ButtonConfigAntd
                        label={"No"}
                        border="none"
                        background="var(--button-color-light-black)"
                        fontSizeLabel={14}
                        fontWeightLabel={500}
                        height={40}
                    />
                </Col>
                <Col span={11}>
                    <ButtonConfigAntd
                        label={"Yes"}
                        onClick={handleMultipleDeleteEmployees}
                        background="var(--button-color-dark-blue)"
                        colorLabel="white"
                        border="none"
                        fontSizeLabel={14}
                        fontWeightLabel={500}
                        height={40}
                    />
                </Col>
            </Row>
        </Modal>
    )
}