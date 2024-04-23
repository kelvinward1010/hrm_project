import { Avatar, Flex, Typography } from "antd";
import styles from "../Header.module.scss";
import { ButtonConfigAntd } from "@/components";
import { useState } from "react";
import { ModalSignOut } from "./ModalSignOut";
import { cutString } from "@/utils/string";
import { COLOR_AVATAR_CONFIG } from "../config";
import { useNavigate } from "react-router-dom";
import { settingsUrl } from "@/routes/urls";
import { useTranslation } from "react-i18next";

const { Text, Title } = Typography;

interface ActionAccProps {
    user?: any;
}

export const ActionAcc: React.FC<ActionAccProps> = ({
    user
}) => {

    const navigate = useNavigate();
    const { t } = useTranslation();
    const [isOpenSignOut, setIsOpenSignOut] = useState(false);

    const handleOpen = () => {
        setIsOpenSignOut(true);
    }

    const handleGoProfileChangePassword = () => navigate(settingsUrl);

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
                    label={t("account_actions.lable_sign_out")}
                    background="#0091FF"
                    colorLabel={"white"}
                    fontWeightLabel={400}
                    height={40}
                    m="20px 0 15px 0"
                    onClick={handleOpen}
                />
                <Text className={styles.resetpass} onClick={handleGoProfileChangePassword}>
                    {t("account_actions.lable_reset_password")}
                </Text>
            </div>
        </>
    )
}