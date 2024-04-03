import styles from "./TableEmployee.module.scss";


interface TableEmployeeProps{
    data?: any[];
}

export const TableEmployee: React.FC<TableEmployeeProps> = ({
    data
}) => {
    return (
        <div className={styles.container}>
            TableEmployy: {data}
        </div>
    )
}