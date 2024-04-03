import { Button, Typography } from "@mui/material";


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
    padding?: string;
}


export function ButtonConfigMui(props: ButtonConfigProps) {
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
                textTransform: "none",
                padding: `${props.padding}`,
            }}
        >
            {props.leftIcon}
            <Typography
                style={{
                    color: `${props.colorLabel ?? "black"}`,
                    fontSize: `${props.fontSizeLabel ?? "15px"}`,
                    fontWeight: `${props.fontWeightLabel ?? 300}`,
                    margin: "4px 0 0 5px",
                }}
            >
                {props.label}
            </Typography>
            {props.rightIcon}
        </Button>
    )
}