import type { ButtonProps } from "@mui/material/Button";
import Button from "@mui/material/Button";

const CButton = (props: ButtonProps) => {
  return <Button variant="contained" color="primary" size="small" {...props} />;
};

export default CButton;
