
import { Box, Container, styled, Toolbar } from "@mui/material";

export const HeaderToolbar = styled(Toolbar)(({ theme }) => ({
    justifyContent: "space-between",
    [theme.breakpoints.down('md')]: {
        justifyContent: "space-between",
    },
    [theme.breakpoints.up('sm')]: {
        justifyContent: "space-between",
    },
}));