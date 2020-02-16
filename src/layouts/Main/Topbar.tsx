import React, { FC } from 'react';
import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { ChevronLeft, Menu } from '@material-ui/icons';
import clsx from 'clsx';

const useStyles = (drawerMaxWidth: number) =>
  makeStyles(theme => ({
    appBar: {
      transition: theme.transitions.create(['margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      transition: theme.transitions.create(['margin'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
  }));

type Props = {
  title: string;
  drawerOpened?: boolean;
  maxDrawerWidth?: number;
  onDrawerOpen?: () => void;
  onDrawerClose?: () => void;
};

const Topbar: FC<Props> = ({
  title,
  maxDrawerWidth = 240,
  drawerOpened = true,
  onDrawerOpen = () => ({}),
  onDrawerClose = () => ({}),
}) => {
  const { appBar, appBarShift, menuButton, hide } = useStyles(maxDrawerWidth)();

  function onOpen() {
    onDrawerOpen();
  }

  function onClose() {
    onDrawerClose();
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <div
          className={clsx(appBar, {
            [appBarShift]: drawerOpened,
          })}
        />
        <IconButton
          color="inherit"
          aria-label="Open Drawer"
          edge="start"
          onClick={onOpen}
          className={clsx(menuButton, drawerOpened && hide)}
        >
          <Menu />
        </IconButton>

        <IconButton
          color="inherit"
          aria-label="Close Drawer"
          edge="start"
          onClick={onClose}
          className={clsx(menuButton, !drawerOpened && hide)}
        >
          <ChevronLeft />
        </IconButton>
        <Typography variant="h6" noWrap>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
