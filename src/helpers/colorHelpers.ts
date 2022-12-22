const translateFromHexToDec = (hex: string): number => {
    if (hex.length !== 1) throw new Error('Nuber length must be equal to 1!');
    if (isNaN(Number(hex))) {
        switch (hex.toUpperCase()) {
            case 'A': return 10;
            case 'B': return 11;
            case 'C': return 12;
            case 'D': return 13;
            case 'E': return 14;
            case 'F': return 15;
            default: throw new Error('Wrong hex number!');
        }
    }
    return Number(hex);
}

const translateFromShortToLongHex = (hash: string) => {
    let result: string = '';
    Object.entries(hash).forEach(([_, value]) => {
        result += value + value;
    });
    return result;
}

const getRgbValues = (hash: string): number[] => {
    const result: number[] = [];
    const numbers = Array.from(hash);
    let colorValue = 0;
    Object.entries(numbers).forEach(([index, value]) => {
        if (Number(index) % 2 === 0) {
            colorValue += 16 * translateFromHexToDec(value);
            return;
        }
        colorValue += translateFromHexToDec(value);
        result.push(colorValue);
        colorValue = 0;
    });
    return result;
}

const getRgb = (hash: string): number[] => {
    switch (hash.length) {
        case 3:
            return getRgbValues(translateFromShortToLongHex(hash));
        case 6:
            return getRgbValues(hash);
        default:
            throw new Error('Wrong HASH length!');
    }
}

export const getRgbaFromHash = (hash: string, opacity: number = 1): string => {
    if (hash[0] !== '#') throw new Error('HASH must start with "#"!');
    const rgb = getRgb(hash.substring(1));
    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
}
