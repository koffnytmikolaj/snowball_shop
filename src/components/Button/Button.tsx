import clsx from 'clsx';
import { useState } from 'react';
import { getRgbaFromHash } from '../../helpers/colorHelpers';
import { ButtonVariants } from '../../types/ButtonType';
import style from './button.module.css'

interface IButton {
    children: JSX.Element;
    className?: string;
    color?: string;
    variant?: typeof ButtonVariants.FILLED | typeof ButtonVariants.OUTLINED;
    onClick?: () => void;
}

export default function Button(props: IButton) {
    const { children, className, color = '#633BF5', variant = ButtonVariants.FILLED, onClick } = props;
    const [clicked, setClicked] = useState<boolean>(false);
    const [hovered, setHovered] = useState<boolean>(false);

    const getBackgroundColor = (): string => {
        switch (variant) {
            case ButtonVariants.FILLED:
                if (clicked) return getRgbaFromHash(color, 0.6);
                if (hovered) return getRgbaFromHash(color, 0.92);
                return getRgbaFromHash(color);
            case ButtonVariants.OUTLINED:
                if (clicked) return getRgbaFromHash(color, 0.4);
                if (hovered) return getRgbaFromHash(color, 0.08);
                return 'transparent';
            default:
                return '';
        }
    }

    const theme = {
        button: {
            borderColor: color,
            color: variant === ButtonVariants.FILLED ? '#FFF' : color,
            backgroundColor: getBackgroundColor(),
        },
    };

    function handleMouseDown() {
        setClicked(true)
    }
    function handleMouseUp() {
        setClicked(false)
    }
    function handleMouseEnter() {
        setHovered(true);
    }
    function handleMouseLeave() {
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
            className={clsx(style.button, className)} 
            style={theme.button}
        >
            {children}
        </button>
    )
}
