import { useCallback } from "react";
import { useNavigate } from 'react-router';
import { Pagination as PaginationMui } from "@mui/material";

interface IPagination {
  categoryName: string;
  count: number;
  value: number;
}

export default function Pagination(props: IPagination) {
    const { categoryName, count, value } = props;
    const navigate = useNavigate();

    const onChange = useCallback(
      (_: React.ChangeEvent<unknown>, number: number) => {
        navigate(`/store/${categoryName}/${number}`);
      },
      [categoryName, navigate],
    );
    
    return <PaginationMui count={count} onChange={onChange} page={value} />
}