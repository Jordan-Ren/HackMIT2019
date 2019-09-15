import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SignIn from './SignIn';
import SignUp from './SignUp';
import DonateForm from './DonateForm';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <DonateForm />
          <Typography align="center" variant="h6" className={classes.title}>
            Food Locator by TEXMIX
          </Typography>
          <SignUp />
          <SignIn />
        </Toolbar>
      </AppBar>
    </div>
  );
}