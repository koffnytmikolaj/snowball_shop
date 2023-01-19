import { ReactNode } from "react";
import { ButtonVariants } from "enums/ButtonEnums";

export interface BoxProps {
    children: ReactNode;
    className?: string;
    sx?: object;
}

export interface ButtonProps {
    children: JSX.Element;
    className?: string;
    color?: string;
    disabled?: boolean;
    variant?: ButtonVariants;
    onClick?: () => void;
}