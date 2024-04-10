import { Typography } from "antd"

const { Text } = Typography;

interface LabelInputProps{
    label: any;
}

export const LableInput: React.FC<LabelInputProps> = ({
    label
}) => {
    return <Text style={{fontSize: "14px", fontWeight: "400"}}>{label}</Text>
}