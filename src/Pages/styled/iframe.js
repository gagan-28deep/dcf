import { styled } from "@mui/material";

export const CustomIframeContainer = styled("div")(({ theme }) => ({
    position: "relative",
    width: "100%",
    overflow: "hidden",
    paddingTop: "56.25%", /* 16:9 Aspect Ratio */
    [theme.breakpoints.down("md")]: {
        padding: "28.25%"
    },
    [theme.breakpoints.down("sm")]: {
        padding: "28.25%"
    }
}));

export const CustomIframeResponsive = styled("iframe")(({ theme }) => ({
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: "100%",
    height: "100%",
    border: "none"
}));