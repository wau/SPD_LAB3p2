// import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';




export default function Login({ state }) {
  const [open, setOpen] = React.useState(false);

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



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event, state) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    const sleep = ms => new Promise(
      resolve => setTimeout(resolve, ms)
    );

    const isLogged = await state.loginUser(email, password);

    if (isLogged) {
      await sleep(3000);

      await state.showWelcome();

    }
    else {
      handleClickOpen();
    }


    event.target.reset();
  };
  return (
    <div className="containerLogin">
      <Container component="main" maxWidth="xs">
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
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </MuiThemeProvider>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              id='submit'
              style={{ color: 'black', backgroundColor: '#ffde59', border: '1px solid black' }}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link id='link' onClick={state.showRegister}>Don't have an account? Register</Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>


      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Wrong credentials"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Wrong username or password
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}