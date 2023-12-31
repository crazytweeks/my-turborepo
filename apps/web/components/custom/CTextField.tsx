import TextField, { TextFieldProps } from "@mui/material/TextField";

const CTextField = (props: TextFieldProps) => {
  return (
    <TextField
      fullWidth={true}
      variant="outlined"
      margin="normal"
      size="small"
      {...props}
    />
  );
};

export { CTextField };
