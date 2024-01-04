import { hasFlag } from 'country-flag-icons';
import { IN } from 'country-flag-icons/react/3x2';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import Image from 'next/image';
import React from 'react';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import StyledBadge from '../../../components/custom/StyledBadge';

const countryCode = "IN" as const;

const getIconUrl = (countryCode: string) =>
  `https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode}.svg`;

const InboxRightComponent = () => (
  <Box>
    <List>
      <ListItem disablePadding>
        <CardHeader
          avatar={
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
              color="warning"
            >
              <Avatar alt="Sharp" src="/static/images/avatar/1.jpg" />
            </StyledBadge>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
          sx={{
            width: "100%",
          }}
        />
      </ListItem>
      <Divider variant="middle" />
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            {countryCode === "IN" ? (
              <IN title="India" height={25} />
            ) : hasFlag(countryCode) ? (
              <Image
                alt={countryCode}
                width={25}
                src={getIconUrl(countryCode)}
              />
            ) : (
              getUnicodeFlagIcon(countryCode)
            )}
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItemButton>
      </ListItem>
    </List>
  </Box>
);

export default InboxRightComponent;
