// React imports.
import React from "react";
import Button from "@material-ui/core/Button";

/**
 * WelcomeView.
 */
const WelcomeView = ({state}) => (

  <div className="backgroundimg">
    <Button id="enterButton" variant="contained" size="large" onClick={ () => state.showProducts() }>Bem-vindas!
    </Button>
  </div>
  
); /* WelcomeView. */


export default WelcomeView;
