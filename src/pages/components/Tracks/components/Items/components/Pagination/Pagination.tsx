import { useCallback } from "react";
import { useLocation, useNavigate } from 'react-router';
import { sections } from "enums/SectionType";
import { useAppContext } from "providers/app/app.providers";
import { Pagination as PaginationMui } from "@mui/material";

interface IPagination {
  count: number;
}

export default function Pagination(props: IPagination) {
    const { count } = props;
    const { location } = useAppContext();
    const currentLocation = useLocation();
    const navigate = useNavigate();

    const onChange = useCallback(
      (_: React.ChangeEvent<unknown>, number: number) => {
        navigate(`${sections.TRACKS}/${location.section2}/${number}${currentLocation.search}`);
      },
      [currentLocation, location, navigate],
    );
    
    return <PaginationMui count={count} onChange={onChange} page={location.section3} />
}
