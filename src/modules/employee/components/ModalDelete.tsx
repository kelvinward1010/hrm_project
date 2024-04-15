import { ButtonConfigAntd } from "@/components";
import { Col, Modal, Row, Typography } from "antd";
import { useDeleteMultipleEmployees } from "../api/deleteMultipleEmployees";
import { getIdsItemsEmployee } from "@/utils/data";
import { Notification } from "@/components/notification/Notification";
import { IEmployeeTable } from "../types";
import { useMutation } from "react-query";
import { queryClient } from "@/lib/react-query";
import { useRecoilState } from "recoil";
import { isDeleteItemAtom } from "../state/table.atom";

interface ModalDeleteProps {
    isOpen?: boolean;
    setIsOpen?: any;
    itemsSelected: IEmployeeTable[];
}

const { Text } = Typography;

export function ModalDelete(props: ModalDeleteProps) {

    const [, setIsItemSelected] = useRecoilState(isDeleteItemAtom);
    const queryFn = {
        record_ids: getIdsItemsEmployee(props.itemsSelected)
    }

    const deletePostMutation = useMutation(useDeleteMultipleEmployees, {
        onSuccess: () => {
            queryClient.invalidateQueries(['employee'])
        }
    });

    const handleDeleteEmployee = async () => {
        try {
            await deletePostMutation.mutateAsync(queryFn).then(() => {
                Notification({
                    message: "Successfully deleted",
                    type: "success",
                })
                props.setIsOpen(false);
                setIsItemSelected(true);
            });
        } catch (error) {
            Notification({
                message: error as string,
                type: "error",
            })
        }
    };
    
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
                        onClick={handleDeleteEmployee}
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