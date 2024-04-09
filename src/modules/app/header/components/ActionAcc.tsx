import { Avatar, Flex, Typography } from "antd";
import styles from "../Header.module.scss";
import { ButtonConfigAntd } from "@/components";
import { useState } from "react";
import { ModalSignOut } from "./ModalSignOut";
import { cutString } from "@/utils/string";
import { COLOR_AVATAR_CONFIG } from "../types";

const { Text, Title } = Typography;

interface ActionAccProps {
    user?: any;
}

export const ActionAcc: React.FC<ActionAccProps> = ({
    user
}) => {
    const [isOpenSignOut, setIsOpenSignOut] = useState(false);

    const handleOpen = () => {
        setIsOpenSignOut(true);
    }

    return (
        <>
            <ModalSignOut 
                isOpen={isOpenSignOut}
                setIsOpen={setIsOpenSignOut}
            />
            <div className={styles.card_main}>
                <Flex justify={'flex-start'} align={'center'} gap={10}>
                    <Avatar style={{ cursor: "pointer", background: `${COLOR_AVATAR_CONFIG[user?.username?.length % 8]}` }}>
                            {cutString(user?.username)}
                        </Avatar>
                    <Text className={styles.name_acc}>{user?.username}</Text>
                </Flex>
                <span className={styles.cv_name}>Line Manager</span>
                <Title level={4} className={styles.sew}>Sew Department</Title>
                <Title level={4} style={{marginTop: "-10px"}}>NIK: 1010</Title>
                <ButtonConfigAntd
                    label={"Sign Out"}
                    background="#0091FF"
                    colorLabel={"white"}
                    fontWeightLabel={400}
                    height={40}
                    m="20px 0 15px 0"
                    onClick={handleOpen}
                />
                <Text className={styles.resetpass}>Reset password</Text>
            </div>
        </>
    )
}