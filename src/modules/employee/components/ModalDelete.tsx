import { ButtonConfigAntd } from "@/components";
import { Col, Modal, Row, Typography } from "antd";

interface ModalDeleteProps {
    isOpen?: boolean;
    setIsOpen?: any;
}

const { Text } = Typography;

export function ModalDelete(props: ModalDeleteProps) {

    const handleLogout = () => {
        props.setIsOpen(false);
    }
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
                        onClick={handleLogout}
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