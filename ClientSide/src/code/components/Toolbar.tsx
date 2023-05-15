// React imports.
import React from "react";
// import logo from "https://techcrunch.com/wp-content/uploads/2014/06/screenshot-2014-06-18-16-31-30.png"

// Material-UI imports.
import Button from "@material-ui/core/Button";
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';

const logout = async(state) =>{
  const sleep = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  state.logoutUser();

  await sleep(3000);

  await state.showWelcome();
}
/**
 * Toolbar.
 */
const Toolbar = ({ state }) => (

  <div style={{ backgroundColor: 'black', height: 40, marginTop: 5 }}>
    <Button style={{ color: '#black', height: 40 }}
      onClick={() => state.showWelcome()} > <img src={require('../../images/logo.jpg')} style={{ width: 80, height: 30, float: 'left' }} />
    </Button>
    <Button id="moviesButton" onClick={() => state.showProducts()}>Movies</Button>


    {state.userName == null &&
      <Button variant="contained" size="small" style={{ marginTop: 4, marginRight: 10, color: '#black', backgroundColor: '#ffde59', float: 'right' }}
        onClick={state.showRegister} >
        <HowToRegIcon style={{ marginRight: 10 }} />Register
      </Button>
    }


    {state.userName == null
      &&
      <Button variant="contained" size="small" style={{ marginTop: 4, marginRight: 10, color: '#black', backgroundColor: '#ffde59', float: 'right' }}
        onClick={() => state.showLogin()} >
        <LoginIcon style={{ marginRight: 10 }} />Login
      </Button>
      ||
      <Button variant="contained" size="small" style={{ marginTop: 4, marginRight: 10, color: '#black', backgroundColor: '#ffde59', float: 'right' }}
        onClick={() => logout(state)} >
        <LoginIcon style={{ marginRight: 10 }} />Logout
      </Button>
    }
    {state.userName != null
      &&
      <Button id="userButton"> {`${state.userName}`}<img className = "pfp" src={require(`../../images/${state.profilepic}`)} /></Button>
    }

  </div>


);


export default Toolbar;
