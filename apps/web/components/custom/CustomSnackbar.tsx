import { keyframes } from "@emotion/react";
import blue from "@mui/material/colors/blue";
import grey from "@mui/material/colors/grey";
import { css, styled } from "@mui/material/styles";

const snackbarInRight = keyframes`
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
`;

const CustomSnackbar = styled("div")(
  ({ theme }) => css`
    position: fixed;
    z-index: 5500;
    display: flex;
    right: 16px;
    bottom: 16px;
    left: auto;
    justify-content: start;
    max-width: 560px;
    min-width: 300px;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: ${theme.palette.mode === "dark"
      ? `0 4px 8px rgb(0 0 0 / 0.7)`
      : `0 4px 8px rgb(0 0 0 / 0.1)`};
    padding: 0.75rem;
    color: ${theme.palette.mode === "dark" ? blue[200] : blue[700]};
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    animation: ${snackbarInRight} 200ms;
    transition: transform 0.2s ease-out;
  `,
);

export default CustomSnackbar;
