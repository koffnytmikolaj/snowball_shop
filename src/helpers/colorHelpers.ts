import { IColor } from "interfaces/helpers";

const validateHexColor = (color: string): string => (color.length === 1 ? `0${color}` : color);

export const transformColorFromHexToObject = (colorString: string): IColor => {
  if (colorString[0] !== '#' || (colorString.length !== 7 && colorString.length !== 4))
    throw Error('Wrong color format!');
  const color = colorString.slice(1);
  return {
    red: parseInt(color.slice(0, 2), 16),
    green: parseInt(color.slice(2, 4), 16),
    blue: parseInt(color.slice(4), 16),
  };
};

export const transformColorFromObjectToRGBA = (color: IColor, opacity: number = 1): string => {
  const { red, green, blue } = color;
  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
};

const transformColorFromRGBAToObject = (rgba: string): IColor => {
    const regexp: RegExp = /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*\d+\.?\d*)?\s*\)$/
    if (!regexp.test(rgba)) throw new Error('Invalid RGBA!');
    const rgbaValues: string[] = rgba.slice(rgba.indexOf('(') + 1, rgba.indexOf(')')).split(',')
    const [red, green, blue, opacity] = rgbaValues;
    return {
        red: Number(red), 
        green: Number(green), 
        blue: Number(blue),
        opacity: opacity ? Number(opacity) : undefined,
    };
}

export const transformColorFromRGBAToHex = (rgba: string) => {
    const color = transformColorFromRGBAToObject(rgba);
    return transformColorFromObjectToHex(color);
}

export const transformColorFromHexToRGBA = (hex: string, opacity?: number): string => {
    const color = transformColorFromHexToObject(hex);
    return transformColorFromObjectToRGBA(color, opacity);
}

export const transformColorFromObjectToHex = (color: IColor): string => {
  const red = validateHexColor(color.red.toString(16));
  const green = validateHexColor(color.green.toString(16));
  const blue = validateHexColor(color.blue.toString(16));
  return `#${red}${green}${blue}`.toUpperCase();
};

export const getOppositeColor = (color: IColor): IColor => {
  const { red, green, blue, opacity } = color;
  const oppositeColor: IColor = {
    red: 255 - red,
    green: 255 - green,
    blue: 255 - blue,
    opacity,
  };
  return oppositeColor;
};
