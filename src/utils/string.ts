export const cutString = (s: string) => {
    if (s === "") return;
    return s?.substring(0, 2)?.toLocaleUpperCase();
}

export function generateRandomNumberString(): string {
    let result = '';
    const characters = '0123456789';
    const charLength = characters.length;
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * charLength);
        result += characters.charAt(randomIndex);
    }
    return result;
}

export function extractFileNameFromUrl(url: string): string {
    const urlParts = url?.split('/');
    return urlParts[urlParts?.length - 1];
}

export function extractFileName(url: string): string {
    const urlParts = url?.split('/');
    const fullFileName = urlParts[urlParts?.length - 1];
    const fileNameWithoutExtension = fullFileName.split('.')[0];
    return fileNameWithoutExtension;
}

export function extractDateT(url: string): string {
    const date = url?.split('T');
    return date[0];
}