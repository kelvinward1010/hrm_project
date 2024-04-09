import { ButtonConfigAntd } from "@/components";
import { Notification } from "@/components/notification/Notification";
import { signOut } from "@/redux/actions/authAction";
import { AppDispatch } from "@/redux/store";
import { Col, Modal, Row } from "antd";
import { useDispatch } from "react-redux";

interface ModalSignOutProps {
    isOpen?: boolean;
    setIsOpen?: any;
}

export function ModalSignOut(props: ModalSignOutProps) {
    
    const dispatch: AppDispatch = useDispatch();

    const handleLogout = () => {
        props.setIsOpen(false);
        signOut(dispatch).then(() => {
            Notification({
                message: "Logged out",
                type: "success"
            })
        }).catch((err) => {
            Notification({
                message: err.data?.message,
                type: "error"
            })
        })
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