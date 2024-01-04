"use client";

import Box from "@mui/material/Box";
import { AutoSizer } from "react-virtualized";

import useUiStore from "../../../lib/store/uiStore";
import SettingFields from "./SettingFields";

const Page = () => {
  const { appbarHeight } = useUiStore();

  return (
    <AutoSizer>
      {({ width, height }) => (
        <Box
          sx={{
            flexGrow: 1,
            flexShrink: 1,
            flexWrap: "nowrap",
            p: 1,
            height: `calc(${height}px - ${appbarHeight}px)`,
            overflow: "auto",
            width,
          }}
        >
          <SettingFields />
        </Box>
      )}
    </AutoSizer>
  );
};

export default Page;
