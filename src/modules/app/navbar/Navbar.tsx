import { Typography } from "antd";
import styles from "./Navbar.module.scss";
import { NavLink } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { employeeUrl } from "@/routes/urls";
import { EmployeeIcon } from "@/assets/svg";

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
                leftSection={<img src={EmployeeIcon} alt="employee-icon"/>}
                onClick={() => navigate(employeeUrl)}
            />
        </div>
    )
}

export default Navbar