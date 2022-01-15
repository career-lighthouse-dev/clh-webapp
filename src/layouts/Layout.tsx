import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
  },
}));

interface Props {
  children: React.ReactNode;
  themeToggler: Function;
  themeMode: string;
};

const Layout = ({ children, themeToggler, themeMode }: Props): JSX.Element => {

  const classes = useStyles();

  return (
    <React.Fragment>
        <div
        className={clsx({
            [classes.root]: true,
        })}
        >
            {/* <head></head> */}
            {children}
            {/* <footer></footer> */}
        </div>
    </React.Fragment>
  );
};

export default Layout;