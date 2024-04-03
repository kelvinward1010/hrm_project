import { Typography } from "antd";
import styles from "./Navbar.module.scss";
import { NavLink } from "@mantine/core";
import { IconCalendarCog } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { employeeUrl } from "@/routes/urls";

const { Title } = Typography;

function Navbar() {
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <Title level={2} className={styles.offall}>General</Title>
            <NavLink 
                color="lime.4"
                label="Employee Management" 
                className={styles.navlink}
                leftSection={<IconCalendarCog className={styles.icon_calender}/>}
                onClick={() => navigate(employeeUrl)}
            />
        </div>
    )
}

export default Navbar