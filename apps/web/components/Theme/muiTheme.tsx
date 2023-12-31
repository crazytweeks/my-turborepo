import { createTheme } from "@mui/material/styles";

import themeCreator from "./schemas/base";

const muiTheme = createTheme({
  ...themeCreator("GreyGoose"),
});

export default muiTheme;
