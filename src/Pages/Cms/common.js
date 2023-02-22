import { styled, Typography, Card } from "@mui/material";

export const Header = styled(Typography)(({ theme }) => ({
    fontSize: '30px',
    marginTop: '40px',
    fontWeight: 600,
    textAlign: 'center',
    color: '#2a2a2a',
    marginBottom: 10,
    [theme.breakpoints.down('md')]: {
        fontSize: '25px'
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '25px'
    },
}));

export const CustomPrivacyHeader = styled(Typography)(({ theme }) => ({
    fontSize: '35px',
    marginTop: '40px',
    fontWeight: 600,
    textAlign: 'left',
    color: '#2a2a2a',
    marginBottom: 10,
    [theme.breakpoints.down('md')]: {
        fontSize: '25px'
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '25px'
    },
}));
export const CustomTermHeader = styled(Typography)(({ theme }) => ({
    fontSize: '24px',
    marginTop: '40px',
    fontWeight: 600,
    textAlign: 'left',
    color: '#2a2a2a',
    marginBottom: 10
}));

export const CustomSubHeader = styled(Typography)(({ theme }) => ({
    fontSize: '16px',
    fontWeight: 600,
    textAlign: 'left',
    color: '#7b7c93',
    marginBottom: 10,
    [theme.breakpoints.down('md')]: {
        fontSize: '25px'
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '25px'
    },
}));

export const Paragraph = styled(Typography)(({ theme }) => ({
    fontSize: '16px',
    color: '#7b7c93'
}));

export const CustomCard = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    border: 'none',
    textAlign: 'left'
}));