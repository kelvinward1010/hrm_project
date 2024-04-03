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
    m?: string;
    border?: string;
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