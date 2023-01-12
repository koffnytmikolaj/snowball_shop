import { BoxProps } from 'interfaces/components';
import clsx from 'clsx';
import style from './box.module.css';

export default function Box(props: BoxProps) {
    const { children, className, sx } = props;
    const boxClassName = clsx(style.blackBox, className);
    
    return (
        <div className={boxClassName} style={sx}>
            <div className={style.content}>
                {children}
            </div>
        </div>
    )
}