import { ReactNode } from "react";
import { ButtonVariants } from "enums/Button";

export interface BoxProps {
    children: ReactNode;
    className?: string;
    sx?: object;
}

export interface ButtonProps {
    children: JSX.Element;
    className?: string;
    color?: string;
    variant?: ButtonVariants;
    onClick?: () => void;
}