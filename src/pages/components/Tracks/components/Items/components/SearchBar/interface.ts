import { Dispatch } from "react";

export interface SearchBarProps {
    numberOfPages: number;
    setSearchText: Dispatch<string>;
}