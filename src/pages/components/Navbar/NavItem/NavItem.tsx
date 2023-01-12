import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { clsx } from 'clsx';
import { useAppContext } from "providers/app/app.providers";
import { NavItemProps } from "./interface";
import style from './navItem.module.css';
import AcUnitSharpIcon from '@mui/icons-material/AcUnitSharp';

export default function NavItem(props: NavItemProps) {
    const { pageId, label } = props;
    const { location } = useAppContext();
    const navigate = useNavigate();
    const active: boolean = pageId === location.section1;
    const buttonClassNames: string = clsx(style.nav_button, active && style['nav_button--selected']);

    const changeSection = useCallback(() => {
        navigate(pageId);
    }, [pageId, navigate]);

    return (
        <button className={buttonClassNames} onClick={changeSection}>
            {label || <AcUnitSharpIcon />}
        </button>
    );
}
