import { BAIcon, ENIcon } from "@/assets/svg";

export const COLOR_AVATAR_CONFIG = ["#00FF33", "#FF9999", "#FF3300", "#0033CC", "#009900", "#CC00FF", "#660099", "#660000"];

export interface OptionLanguages {
    label: string;
    value: string;
    icon: any;
}

export const OPTIONS_LANGUAGES: OptionLanguages[] = [
    { 
        label: 'EN', 
        value: 'en',
        icon: ENIcon,
    },
    { 
        label: 'BA', 
        value: 'ba',
        icon: BAIcon,
    },
];
