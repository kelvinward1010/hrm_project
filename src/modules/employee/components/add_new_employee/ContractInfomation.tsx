import { TitleAll } from "./TitleAll";
import styles from "./ContractInfomation.module.scss";
import { useTranslation } from "react-i18next";

export function ContractInfomation() {
    const { t } = useTranslation();
    return (
        <div className={styles.container}>
            <TitleAll title={t("features.employee.features_add_new.titleall.title2")}/>
            ContractInfomation
        </div>
    )
}