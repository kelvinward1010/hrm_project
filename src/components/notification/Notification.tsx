import "./Notification.css";
import { notification } from "antd";
import { IconLoader } from "@tabler/icons-react";
import { WarningOutlined } from "@ant-design/icons";

interface NotificationProps{
    message:string;
    type: "export" | "success" | "warning" | "error" | "info"
}

export const Notification = ({
    message,
    type,
}: NotificationProps) => {
    if(type === "success"){
        return notification.success({
            message: message
        })
    }

    if(type === "warning"){
        return notification.warning({
            message: message,
        })
    }

    if(type === "error"){
        return notification.error({
            message: message,
            icon: <WarningOutlined />
        })
    }

    if(type === "info"){
        return notification.info({
            message: message
        })
    }

    if(type === "export"){
        return notification.open({
            message: message,
            className: "ant-notification-notice-export-config",
            icon: <IconLoader className="export_icon"/>
        })
    }
}
