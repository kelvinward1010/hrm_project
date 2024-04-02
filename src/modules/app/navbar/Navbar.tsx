import { Typography } from "antd";
import styles from "./Navbar.module.scss";
import { NavLink } from "@mantine/core";
import { IconCalendarCog } from "@tabler/icons-react";

const { Title } = Typography;

function Navbar() {
    return (
        <div className={styles.container}>
            <Title level={2} className={styles.offall}>General</Title>
            <NavLink 
                color="lime.4"
                label="Employee Management" 
                className={styles.navlink}
                leftSection={<IconCalendarCog className={styles.icon_calender}/>}
            />
        </div>
    )
}

export default Navbar