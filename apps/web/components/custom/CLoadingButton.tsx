import type { LoadingButtonProps } from "@mui/lab/LoadingButton";
import LoadingButton from "@mui/lab/LoadingButton";

const CLoadingButton = (props: LoadingButtonProps) => {
  return (
    <LoadingButton
      variant="contained"
      color="primary"
      size="small"
      {...props}
    />
  );
};

export default CLoadingButton;
