import { useTranslation } from "react-i18next";
import styles from "./SalaryAndWages.module.scss";
import { TitleAll } from "./TitleAll";

export function SalaryAndWages() {
    const { t } = useTranslation();
    return (
        <div className={styles.container}>
            <TitleAll title={t("features.employee.features_add_new.titleall.title4")}/>
            SalaryAndWages
        </div>
    )
}