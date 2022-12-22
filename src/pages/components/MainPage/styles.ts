import Button from "@mui/material/Button/Button";
import { styled } from "@mui/material/styles";

export const NavButton = styled(Button)({
    borderColor: '#633BF5',
    color: '#633BF5',
    "&:hover": {
        borderColor: '#633BF5',
        backgroundColor: 'rgba(99, 59, 245, 0.08)',
    }
});
