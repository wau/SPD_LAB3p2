import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { useState } from 'react';

const handleSubmit = async (event, state) => {
  event.preventDefault();

  const user = {
    name: event.target.userName.value,
    email: event.target.email.value,
    password: event.target.password.value,
    repeatPassword: event.target.repeatPassword.value
  }

  const sleep = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  if (user.password == user.repeatPassword) {
    await state.registerUser(user);

    await sleep(3000);

    await state.showWelcome();
  }

  event.target.reset();
};


const theme = createTheme({
  overrides: {
    MuiOutlinedInput: {
      root: {
        "& $notchedOutline": {
          borderColor: "black"
        },
        "&:hover $notchedOutline": {
          borderColor: "black"
        },
        "&$focused $notchedOutline": {
          borderColor: "black"
        },
      }
    },
    MuiInputLabel: {
      root: {
        "&$focused": {
          color: "black"
        }
      },
    },
  }
});

const Register = ({ state }) => (
  <div className="containerLogin">
    <Container component="main" >
      <CssBaseline />
      <div id='paper'>
        <Avatar id='avatar'>
          <LockOutlinedIcon style={{ color: 'black' }} />
        </Avatar>
        <Typography component="h1" variant="h5">
          Enter credentials
        </Typography>
        <form id='form' onSubmit={(event) => handleSubmit(event, state)} >
          <MuiThemeProvider theme={theme}>
            <Grid container spacing={2}>
              <Grid item xs={12}>

                <TextField
                  type="userName"
                  autoComplete="uname"
                  name="userName"
                  variant="outlined"
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  autoFocus
                />

              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="repeatPassword"
                  label="Confirm Password"
                  type="password"

                />
              </Grid>
            </Grid>
          </MuiThemeProvider>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            id='submit'
            style={{ color: 'black', backgroundColor: '#ffde59', border: '1px solid black' }}
          >
            Register
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link id='link' onClick={state.showLogin}>Already have an account? Log in</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  </div>
)
export default Register;
// export function createMuiTheme(options?: ThemeOptions, ...args: object[]): Theme;
// export default function createTheme(options?: ThemeOptions, ...args: object[]): Theme;