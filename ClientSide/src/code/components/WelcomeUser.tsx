import React from "react";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
/**
 * WelcomeView.
 */
const WelcomeUser = ({ state }) => {

  
  return(
    <div className="welcomeMessage">{`Welcome ${state.userName}!`}
  </div>
  )
  
  }; 


export default WelcomeUser;