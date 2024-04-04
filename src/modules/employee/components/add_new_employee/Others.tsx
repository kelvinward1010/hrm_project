import { useTranslation } from "react-i18next";
import styles from "./Others.module.scss";
import { TitleAll } from "./TitleAll";

export function Others() {
    const { t } = useTranslation();
    return (
        <div className={styles.container}>
            <TitleAll title={t("features.employee.features_add_new.titleall.title5")}/>
            Others
        </div>
    )
}