"use client";

import { FC, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { SnackbarProvider, useSnackbar } from "notistack";

interface Props {
  accessToken: string | undefined;
}

const ShowAccessTokenButton: FC<Props> = ({ accessToken }) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    if (!accessToken || !navigator.clipboard) {
      return;
    }

    navigator.clipboard.writeText(accessToken || "");

    enqueueSnackbar("Copied to clipboard", {
      variant: "success",
      autoHideDuration: 2000,
    });
  };

  return (
    <Card
      sx={{
        p: 2,
        m: 2,
      }}
    >
      <TextField
        multiline
        minRows={2}
        maxRows={4}
        value={accessToken}
        fullWidth={true}
        InputProps={{
          startAdornment: (
            <Button
              onClick={handleClick}
              variant="text"
              color="success"
              size="small"
              disableElevation
              sx={{
                mr: 1,
              }}
            >
              {"Copy Access Token"}
            </Button>
          ),
        }}
      />
    </Card>
  );
};

export default ShowAccessTokenButton;
