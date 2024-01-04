import React, { FC } from 'react';
import { AutoSizer, CellMeasurer, CellMeasurerCache, List, ListRowProps } from 'react-virtualized';

import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';

import useUiStore from '../../../lib/store/uiStore';

const CustomChatsSearch = () => {
  return (
    <Paper
      elevation={1}
      component="form"
      sx={{
        m: 1,
        display: "flex",
        alignItems: "center",
        borderRadius: 4,
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        inputProps={{ "aria-label": "search" }}
        size="small"
      />

      <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

const rowCount = 5000;
// const listHeight = 400;
const rowHeight = 50;
// const rowWidth = 700;

const list = Array(rowCount)
  .fill(null)
  .map((val, idx) => {
    return {
      id: idx,
      name: "John Doe",
      image: "http://via.placeholder.com/40",
      text: `
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Iusto distinctio deleniti, doloribus molestiae asperiores mollitia sed non nisi, eligendi pariatur quaerat amet reprehenderit eius repudiandae dolore? Ipsum cupiditate accusamus harum.
      `,
    };
  });

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 100,
});

const RenderRow: FC<ListRowProps> = ({ index, key, style, parent }) => {
  return (
    <CellMeasurer
      key={key}
      cache={cache}
      parent={parent}
      columnIndex={0}
      rowIndex={index}
    >
      {() => (
        <ListItem
          style={style}
          sx={{
            display: "block",
            py: 0,
            px: 0,
            "&:hover": {
              borderRadius: "8px",
              cursor: "pointer",
            },
          }}
        >
          <ListItemButton
            onClick={() => {
              console.log("Clicked on row with data:", list[index]);
            }}
          >
            <ListItemText primary={`Row ${index + 1}`} />
          </ListItemButton>
        </ListItem>
      )}
    </CellMeasurer>
  );
};

const InboxLeftComponent = () => {
  const appbarHeight = useUiStore((s) => s.appbarHeight);
  return (
    <>
      <CustomChatsSearch />
      <AutoSizer>
        {({ width, height }) => (
          <>
            <List
              width={width}
              height={height - appbarHeight}
              rowHeight={rowHeight}
              rowRenderer={RenderRow}
              rowCount={list.length}
              overscanRowCount={3}
            />
          </>
        )}
      </AutoSizer>
    </>
  );
};

export default InboxLeftComponent;
