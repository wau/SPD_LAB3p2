// React imports.
import React from "react";

// Material-UI imports.
import Button from "@material-ui/core/Button";

/**
 * Toolbar.
 */
const LogoBar = () => (

    <div style={{ backgroundColor: 'black', height: 40, marginTop: 5 }}>
        <Button style={{ color: '#black', height: 40 }}> <img src={require('../../images/logo.jpg')} style={{ width: 80, height: 30, float: 'left' }} />
        </Button>
    </div>


);


export default LogoBar;