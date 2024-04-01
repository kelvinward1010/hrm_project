import { Button, Typography } from "antd";

interface ButtonConfigProps{
    label: any;
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
}

const { Text } = Typography;

export function ButtonConfig(props: ButtonConfigProps) {
    return (
        <Button
            onClick={props.onClick}
            style={{
                width: `${props.with ?? "100%"}`,
                height: `${props.height}px`,
                background: `${props.background}`,
                color: `${props.color}`
            }}
        >
            {props.leftIcon}
            <Text 
                style={{
                    color: `${props.colorLabel ?? "black"}`,
                    fontSize: `${props.fontSizeLabel ?? "15px"}`,
                    fontWeight: `${props.fontWeightLabel ?? 300}`
                }}
            >
                {props.label}
            </Text>
            {props.rightIcon}
        </Button>
    )
}