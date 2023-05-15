// React imports.
import Typography from '@material-ui/core/Typography';
import React from "react";
import Link from '@material-ui/core/Link';

function Copyright() {
  return (
    <div style={{ margin: 'auto' }}>
      <Typography variant="body2" align="center" style={{ color: 'white' }}>
        {'Copyright © '}
        <Link style={{ color: 'white', cursor:'pointer' }} >
          Mips TV
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </div>
  );
}

const Footer = () => (

  <div className='footer'>

    <Copyright />

  </div>


);


export default Footer;
