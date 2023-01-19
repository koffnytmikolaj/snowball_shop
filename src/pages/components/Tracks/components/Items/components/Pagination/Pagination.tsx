import { useCallback } from "react";
import { useLocation, useNavigate } from 'react-router';
import { Sections } from "enums/SectionType";
import { useAppContext } from "providers/app/app.providers";
import { PaginationProps } from "./interface";
import { Pagination as PaginationMui } from "@mui/material";

export default function Pagination(props: PaginationProps) {
    const { count, isPageLoading } = props;
    const { section2, section3 } = useAppContext();
    const currentLocation = useLocation();
    const navigate = useNavigate();

    const onChange = useCallback(
      (_: React.ChangeEvent<unknown>, number: number) => {
        navigate(`${Sections.TRACKS}/${section2}/${number}${currentLocation.search}`);
      },
      [currentLocation, section2, navigate],
    );
    
    return (
      <PaginationMui 
        count={count} 
        disabled={isPageLoading}
        page={section3} 
        onChange={onChange} 
      />
    );
}
