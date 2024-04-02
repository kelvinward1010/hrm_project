import { Avatar, Flex, Typography } from "antd";
import styles from "./Header.module.scss";
import { UserOutlined } from "@ant-design/icons";
import { ButtonConfig } from "@/components";
import { useNavigate } from "react-router-dom";
import { signinUrl } from "@/routes/urls";

const { Text, Title } = Typography;

export function ActionAcc() {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate(signinUrl)
    }

    return (
        <div className={styles.card_main}>
            <Flex justify={'flex-start'} align={'center'} gap={10}>
                <Avatar icon={<UserOutlined />}/>
                <Text className={styles.name_acc}>Kelvin Ward</Text>
            </Flex>
            <span className={styles.cv_name}>Line Manager</span>
            <Title level={4} className={styles.sew}>Sew Department</Title>
            <Title level={4} style={{marginTop: "-10px"}}>NIK: 1010</Title>
            <ButtonConfig 
                label={"Sign Out"}
                background="#0091FF"
                colorLabel={"white"}
                fontWeightLabel={400}
                height={40}
                m="20px 0 0 0"
                onClick={handleLogout}
            />
            <Text className={styles.resetpass}>Reset password</Text>
        </div>
    )
}