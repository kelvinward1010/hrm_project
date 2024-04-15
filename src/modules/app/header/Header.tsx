import { useTranslation } from "react-i18next";
import styles from "./Header.module.scss";
import { Avatar, Dropdown, Flex, Select, SelectProps, Typography } from "antd";
import { ActionAcc } from "./components/ActionAcc";
import { BAIcon, ENIcon, Logo } from "@/assets/svg";
import { cutString } from "@/utils/string";
import { COLOR_AVATAR_CONFIG, OPTIONS_LANGUAGES } from "./config";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const { Text } = Typography;
type labelRender = SelectProps['labelRender'];

function Header() {
    const { t, i18n } = useTranslation();
    const user: any = useSelector((state: RootState) => state.auth.user);

    const items = [
        {
            label: <ActionAcc user={user}/>,
            key: '0',
        },
    ]
    const handleChangeLanguages = (value: string) => {
        i18n.changeLanguage(value);
        i18n.reloadResources();
    };

    const currentLanguage = localStorage.getItem('i18nextLng_hrm');

    const configLableLanguages = (icon: any, lable: any) => {
        return (
            <Flex
                justify={'start'}
                align={'center'}
            >
                <img src={icon} alt="" />
                <Text style={{margin: "-2px 0 0 3px"}}>{lable}</Text>
            </Flex>
        )
    }

    const lableRender: labelRender = (props) => {
        if(props.label == 'BA') return configLableLanguages(BAIcon, props.label);
        if(props.label == 'EN') return configLableLanguages(ENIcon, props.label);
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
                        defaultValue={currentLanguage}
                        style={{ width: 120, marginRight: "10px" }}
                        onChange={handleChangeLanguages}
                        options={OPTIONS_LANGUAGES}
                        labelRender={lableRender}
                        optionRender={(options) => {
                            if(options.label == 'EN'){
                                return configLableLanguages(ENIcon, 'EN')
                            }
                            if(options.label == 'BA'){
                                return configLableLanguages(BAIcon, 'BA')
                            }
                        }}
                    />
                    <Dropdown
                        menu={{
                            items,
                        }}
                        trigger={['click']}
                        className={"head"}
                    >
                        <Avatar style={{ cursor: "pointer", background: `${COLOR_AVATAR_CONFIG[user?.username?.length % 8]}` }}>
                            {cutString(user?.username)}
                        </Avatar>
                    </Dropdown>
                </Flex>
            </Flex>
        </div>
    )
}

export default Header