"use client";

import Paper from "@mui/material/Paper";
import { Panel, PanelGroup } from "react-resizable-panels";
import { AutoSizer } from "react-virtualized";

import useUiStore from "../../../lib/store/uiStore";
import InboxCenterComponent from "./InboxCenterComponent";
import InboxLeftComponent from "./InboxLeftComponent";
import InboxRightComponent from "./InboxRightComponent";
import ResizeHandle from "./ResizeHandle";

const Page = () => {
  const { appbarHeight } = useUiStore();
  console.log("appbarHeight: ", appbarHeight);

  return (
    <AutoSizer>
      {({ width, height }) => (
        <Paper
          style={{
            width,
            height: height - appbarHeight,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <PanelGroup autoSaveId="inboxPageResizer" direction="horizontal">
            <Panel collapsible={true} order={1}>
              <InboxLeftComponent />
            </Panel>
            <ResizeHandle direction="horizontal" />

            <Panel collapsible={false} order={2}>
              <InboxCenterComponent />
            </Panel>
            <ResizeHandle direction="horizontal" />

            <Panel collapsible={true} order={3}>
              <InboxRightComponent />
            </Panel>
          </PanelGroup>
        </Paper>
      )}
    </AutoSizer>
  );
};

export default Page;
