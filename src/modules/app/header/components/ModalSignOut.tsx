import { ButtonConfigAntd } from "@/components";
import { signinUrl } from "@/routes/urls";
import { Col, Modal, Row } from "antd";
import { useNavigate } from "react-router-dom";

interface ModalSignOutProps {
    isOpen?: boolean;
    setIsOpen?: any;
}

export function ModalSignOut(props: ModalSignOutProps) {

    const navigate = useNavigate();

    const handleLogout = () => {
        props.setIsOpen(false);
        navigate(signinUrl)
    }
    return (
        <Modal
            title={`Do you wish to sign out?`}
            open={props.isOpen}
            onCancel={() => props.setIsOpen(false)}
            width={300}
            className="ant_modal"
            footer={null}
            centered
        >
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