import { ReactNode } from 'react';
import clsx from 'clsx';
import style from './box.module.css';

interface IBox {
    children: ReactNode;
    className?: string;
    sx?: object;
}

export default function Box(props: IBox) {
    const { children, className, sx } = props;
    return (
        <div className={clsx(style.blackBox, className)} style={sx}>
            <div className={style.content}>
                {children}
            </div>
        </div>
    )
}