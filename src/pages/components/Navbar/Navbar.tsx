import { useEffect } from 'react';
import { useLocation } from "react-router";
import { useAppContext } from "../../../providers/app/app.providers";
import { INavigationNames, navigationNames, sectionsProps } from './constants';
import Box from '../../../components/Box/Box';
import style from "./navbar.module.css"
import NavItem from './NavItem/NavItem';

interface INavbar {}

export function Navbar(props: INavbar) {
    const { setActivePage } = useAppContext();
    const location = useLocation();

    useEffect(() => {
        const indexOfSlash = location.pathname.indexOf('/', 1);
        const navigationName: keyof INavigationNames = indexOfSlash > 0 
            ? location.pathname.slice(0, location.pathname.indexOf('/', 1)) as keyof INavigationNames
            : location.pathname as keyof INavigationNames
        setActivePage(navigationNames[navigationName]);
    }, [location, setActivePage]);

    return (
        <Box className={style.navbar}>
            <div className={style.navItems}>
                {sectionsProps.map(section =>
                    <NavItem 
                        key={section.key}
                        pageId={section.key}
                        label={section.label} 
                    />
                )}
            </div>
        </Box>
    );
}
