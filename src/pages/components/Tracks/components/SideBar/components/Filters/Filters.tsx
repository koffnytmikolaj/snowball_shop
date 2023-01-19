import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { ReturnButton, ReverseCheckbox, SortSelect } from "./components";
import { FiltersProps } from "./interface";
import style from './filters.module.css';

export default function Filters(props: FiltersProps) {
    const { isPageLoading } = props;
    const [showContent, setShowContent] = useState<boolean>(false);
    const filtersClassNames = clsx(style.filters, showContent && style['filters--shown']);

    useEffect(() => setShowContent(true), []);

    return (
        <div className={filtersClassNames}>
            <ReturnButton disabled={isPageLoading} />
            <SortSelect disabled={isPageLoading} />
            <ReverseCheckbox disabled={isPageLoading} />
        </div>
    )
}
