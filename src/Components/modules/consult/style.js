import { styled, Toolbar, Typography, Box, Card, CardContent } from "@mui/material";

export const CustomTabTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.common.white,
    fontSize: '16px',
    fontWeight: 600,
    textAlign: 'center'
}));
export const CustomTabSubTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.common.white,
    fontSize: '14px',
    fontWeight: 500,
    textAlign: 'center'
}));

export const CustomBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: 20,
    marginTop: 10,
    [theme.breakpoints.down('md')]: {
        flexWrap: 'wrap'
    }
}));

export const CustomTitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.dark,
    fontSize: '14px',
    fontWeight: 500,
    textAlign: 'left',
    display: 'flex',
    alignItems: 'baseline',
    [theme.breakpoints.down('md')]: {
        textAlign: 'center',
        justifyContent: 'center',
        width: '100%'

    }
}));

