import { sectionsProps } from './constants';
import Box from 'components/Box/Box';
import style from "./navbar.module.css"
import NavItem from './NavItem/NavItem';

export default function Navbar() {
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
