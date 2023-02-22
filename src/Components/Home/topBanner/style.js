import { Stack, Box, styled } from "@mui/material";

export const CustomImg = styled('img')(({ theme }) => ({
    // backgroundImage: `url(../../../Assets/images/home page/top-banner.png)`,
    backgroundRepeat: 'no-repeat',
    width: '100%',
    backgroundPosition: 'right',
    backgroundSize: 'cover',
    objectFit: 'contain',
    py: 4,    
    height: 'auto'
}));
