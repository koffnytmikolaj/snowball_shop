import { useCallback, useState } from 'react';
import { clsx } from 'clsx';
import { transformColorFromHexToRGBA } from 'helpers/colorHelpers';
import { ButtonProps } from 'interfaces/components';
import { ButtonVariants } from 'enums/Button';
import style from './button.module.css'

export default function Button(props: ButtonProps) {
    const { children, className, color = '#633BF5', variant = ButtonVariants.FILLED, onClick } = props;
    const [clicked, setClicked] = useState<boolean>(false);
    const [hovered, setHovered] = useState<boolean>(false);
    const buttonClassName = clsx(style.button, className);

    const getBackgroundColor = useCallback(
        (): string => {
            switch (variant) {
                case ButtonVariants.FILLED:
                    if (clicked) return transformColorFromHexToRGBA(color, 0.6);
                    if (hovered) return transformColorFromHexToRGBA(color, 0.92);
                    return transformColorFromHexToRGBA(color, 1);
                case ButtonVariants.OUTLINED:
                    if (clicked) return transformColorFromHexToRGBA(color, 0.4);
                    if (hovered) return transformColorFromHexToRGBA(color, 0.08);
                    return 'transparent';
                default:
                    return '';
            }
        }, 
        [clicked, color, hovered, variant]
    );

    const theme = {
        button: {
            borderColor: color,
            color: variant === ButtonVariants.FILLED ? '#FFF' : color,
            backgroundColor: getBackgroundColor(),
        },
    };

    const handleMouseDown = () => {
        setClicked(true)
    }
    const handleMouseUp = () => {
        setClicked(false)
    }
    const handleMouseEnter = () => {
        setHovered(true);
    }
    const handleMouseLeave = () => {
        setHovered(false);
        setClicked(false);
    }

    return (
        <button 
            onClick={onClick} 
            onMouseDown={handleMouseDown} 
            onMouseUp={handleMouseUp} 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={buttonClassName} 
            style={theme.button}
        >
            {children}
        </button>
    )
}
