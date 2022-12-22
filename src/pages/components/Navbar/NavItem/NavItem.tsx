import { useNavigate } from "react-router-dom";
import { clsx } from 'clsx';
import { sections } from "../../../../enums/SectionType";
import { useAppContext } from "../../../../providers/app/app.providers";
import style from './navItem.module.css';
import AcUnitSharpIcon from '@mui/icons-material/AcUnitSharp';

interface INavItem {
    label: string;
    pageId: sections;
}

export default function NavItem(props: INavItem) {
    const { pageId, label } = props;
    const { activePage } = useAppContext();
    const navigate = useNavigate();
    const active: boolean = pageId === activePage;

    function changeSection() {
        navigate(pageId);
    }

    return (
        <button
            className={clsx(style.nav_button, pageId === activePage && style['nav_button--selected'])} 
            onClick={changeSection}
        >
            {label || <AcUnitSharpIcon />}
        </button>
    );
}
