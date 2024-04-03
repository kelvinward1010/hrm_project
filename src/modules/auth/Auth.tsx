import styles from "./Auth.module.scss";
import { Outlet } from "react-router-dom";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import "./style.css";
import { Logo } from "@/assets/svg";

const { Title, Text } = Typography;

export function Auth() {
    const { t } = useTranslation();
    return (
        <div className={styles.container}>
            <img 
                src={Logo} 
                alt="Logo HRM"
                className={styles.logo}
            />
            <Title>
                {t("name_app")}
            </Title>
            <div className={styles.main}>
                <Outlet />
                <Text>
                    {t("auth.cs")}
                </Text>
            </div>
        </div>
    )
}