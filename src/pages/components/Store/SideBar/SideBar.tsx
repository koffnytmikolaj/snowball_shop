import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { useAppContext } from "providers/app/app.providers";
import Box from "components/Box/Box";
import CategoryList from "./CategoryList/CategoryList";
import Filters from "./Filters/Filters";
import style from './sideBar.module.css';

export default function SideBar() {
    const { location } = useAppContext();
    const [sideBarShown, setSideBarShown] = useState<boolean>(false);

    useEffect(() => {
        setSideBarShown(true);
    }, []);

    return (
        <Box className={clsx(style.bar, sideBarShown && style.bar__shown)}>
            {location.section2
                ? <Filters />
                : <CategoryList />
            }
        </Box>
    );
}
