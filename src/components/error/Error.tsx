import { Typography } from "antd";
import styles from "./Error.module.scss";

export function Error() {
    return (
        <div className={styles.container}>
            <Typography.Title level={3}>
                Some thing went wrong!
            </Typography.Title>
        </div>
    )
}