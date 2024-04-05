import { useTranslation } from "react-i18next";
import styles from "./Header.module.scss";
import { Avatar, Dropdown, Flex, Select, Typography } from "antd";
import { ActionAcc } from "./components/ActionAcc";
import { Logo } from "@/assets/svg";
import { cutString } from "@/utils/string";
import { COLOR_AVATAR_CONFIG, OPTIONS_LANGUAGES } from "./types";

const { Text } = Typography;

function Header() {
    const { t } = useTranslation();
    const username = "kelvinward"

    const items = [
        {
            label: <ActionAcc />,
            key: '0',
        },
    ]
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    return (
        <div className={styles.container}>
            <Flex justify={'space-between'} align={'center'} style={{ height: "100%" }}>
                <Flex justify={'center'} align={'center'}>
                    <img src={Logo} width={50} />
                    <Text className={styles.name_app}>{t("name_app")}</Text>
                </Flex>
                <Flex justify={'center'} align={'center'} className={styles.drop}>
                    <Select
                        defaultValue="en"
                        style={{ width: 120, marginRight: "10px" }}
                        onChange={handleChange}
                        options={OPTIONS_LANGUAGES}
                    />
                    <Dropdown
                        menu={{
                            items,
                        }}
                        trigger={['click']}
                        className={"head"}
                    >
                        <Avatar style={{ cursor: "pointer", background: `${COLOR_AVATAR_CONFIG[username?.length % 8]}` }}>
                            {cutString(username)}
                        </Avatar>
                    </Dropdown>
                </Flex>
            </Flex>
        </div>
    )
}

export default Header