import { useTranslation } from "react-i18next";
import styles from "./Header.module.scss";
import LogoImage from "@/assets/svg/logo.svg";
import { Avatar, Dropdown, Flex, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ActionAcc } from "./ActionAcc";

const { Text } = Typography;

function Header() {
    const { t } = useTranslation();
    const items = [
        {
            label: <ActionAcc />,
            key: '0',
        },
    ]
    return (
        <div className={styles.container}>
            <Flex justify={'space-between'} align={'center'} style={{height:"100%"}}>
                <Flex justify={'center'} align={'center'}>
                    <img src={LogoImage} width={50} />
                    <Text className={styles.name_app}>{t("name_app")}</Text>
                </Flex>
                <Flex justify={'center'} align={'center'} className={styles.drop}>
                    <Dropdown
                        menu={{
                            items,
                        }}
                        trigger={['click']}
                        className={styles.head}
                    >
                        <Avatar style={{cursor: "pointer"}} icon={<UserOutlined />}/>
                    </Dropdown>
                </Flex>
            </Flex>
        </div>
    )
}

export default Header