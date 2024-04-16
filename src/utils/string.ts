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