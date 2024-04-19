import { DownloadOutlined } from "@ant-design/icons";
import { ButtonConfigAntd } from "../button_config_antd/ButtonConfigAntd";

interface DownloadButtonProps {
    fileUrl: string;
    fileName: string;
}

export const ButtonDownLoad: React.FC<DownloadButtonProps> = ({ fileUrl, fileName }) => {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <ButtonConfigAntd
            leftIcon={<DownloadOutlined style={{ color: "var(--button-color-dark-teal)" }}/>}
            background="var(--button-color-light-blue)"
            colorLabel="var(--button-color-dark-blue)"
            border="none"
            fontSizeLabel={14}
            fontWeightLabel={500}
            height={40}
            onClick={() => handleDownload()}
        />
    );
};