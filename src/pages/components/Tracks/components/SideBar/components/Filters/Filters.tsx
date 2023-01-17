import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { ReturnButton, ReverseCheckbox, SortSelect } from "./components";
import style from './filters.module.css';

export default function Filters() {
    const [showContent, setShowContent] = useState<boolean>(false);
    const filtersClassNames = clsx(style.filters, showContent && style['filters--shown']);

    useEffect(() => setShowContent(true), []);

    return (
        <div className={filtersClassNames}>
            <ReturnButton />
            <SortSelect />
            <ReverseCheckbox />
        </div>
    )
}
