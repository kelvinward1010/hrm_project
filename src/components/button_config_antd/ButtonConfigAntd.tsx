import { Button, Typography } from "antd";
import styles from "./ButtonConfig.module.scss";

interface ButtonConfigProps{
    label?: any;
    colorLabel?: any;
    fontSizeLabel?: any;
    fontWeightLabel?: any;
    onClick?: () => void;
    leftIcon?: any;
    rightIcon?: any;
    with?: string;
    height?: number;
    background?: string;
    color?: string;
    m?: string;
    border?: string;
    padding?: string;
    htmlType?: "button" | "submit" | "reset" | undefined;
    minWidth?: string;
    disabled?: boolean;
}

const { Text } = Typography;

export function ButtonConfigAntd(props: ButtonConfigProps) {
    return (
        <Button
            onClick={props.onClick}
            style={{
                width: `${props.with ?? "100%"}`,
                height: `${props.height}px`,
                background: `${props.background}`,
                color: `${props.color}`,
                margin: `${props.m}`,
                border: `${props.border}`,
                padding: `${props.padding}`,
                minWidth: `${props.minWidth}`
            }}
            htmlType={props.htmlType}
            disabled={props.disabled}
        >
            <div className={styles.center}>
                {props.leftIcon}
                <Text 
                    style={{
                        color: `${props.colorLabel ?? "black"}`,
                        fontSize: `${props.fontSizeLabel ?? "15px"}`,
                        fontWeight: `${props.fontWeightLabel ?? 300}`,
                        margin: `${props.leftIcon && props.rightIcon ? "0 10px" : 0}`
                    }}
                >
                    {props.label}
                </Text>
                {props.rightIcon}
            </div>
        </Button>
    )
}