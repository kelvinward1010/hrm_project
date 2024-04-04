import { useTranslation } from "react-i18next";
import styles from "./EmploymentDetails.module.scss";
import { TitleAll } from "./TitleAll";

export function EmploymentDetails() {
    const { t } = useTranslation();
    return (
        <div className={styles.container}>
            <TitleAll title={t("features.employee.features_add_new.titleall.title3")}/>
            EmploymentDetails
        </div>
    )
}