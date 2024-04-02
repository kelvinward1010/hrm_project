import { Typography } from "antd"

const { Text } = Typography;

interface LabelConfigProps{
    label: any;
}

export const LabelConfig: React.FC<LabelConfigProps> = ({
    label
}) => {
    return <Text className="label_auth">{label}</Text>
}