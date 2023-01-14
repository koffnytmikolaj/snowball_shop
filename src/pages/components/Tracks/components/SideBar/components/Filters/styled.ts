import Button from "@mui/material/Button/Button";
import { styled } from "@mui/material/styles";

export const ReturnButton = styled(Button)({
    margin: '8px',
    borderColor: '#FFF',
    color: '#FFF',
    "&:hover": {
        borderColor: '#FFF',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
    }
});