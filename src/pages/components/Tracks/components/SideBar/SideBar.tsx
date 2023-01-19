import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { useAppContext } from "providers/app/app.providers";
import { Composers, Filters } from "./components";
import { SideBarProps } from "./interface";
import Box from "components/Box/Box";
import style from './sideBar.module.css';

export default function SideBar(props: SideBarProps) {
    const { isPageLoading } = props;
    const { section2 } = useAppContext();
    const [sideBarShown, setSideBarShown] = useState<boolean>(false);
    const barClassNames = clsx(style.bar, sideBarShown && style.bar__shown);

    useEffect(() => {
        setSideBarShown(true);
    }, []);

    return (
        <Box className={barClassNames}>
            {section2
                ? <Filters isPageLoading={isPageLoading} />
                : <Composers isPageLoading={isPageLoading} />
            }
        </Box>
    );
}
