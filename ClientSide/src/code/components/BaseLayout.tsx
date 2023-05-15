// React imports.
import React, { Component } from "react";

// App imports.
import Toolbar from "./Toolbar";
import WelcomeView from "./WelcomeView";
import WelcomeUser from "./WelcomeUser";
import Login from "./Login";
import Footer from "./Footer";
import Register from "./Register";
import LoopProducts from "./LoopProducts"
import { createState } from "../state";
import LogoBar from "./LogoBar";
import FarewellUser from "./FarewellUser";
import RegisterMessage from "./registerMessage";


/**
 * BaseLayout.
 */

class BaseLayout extends Component {


  /**
   * State data for the app.  This also includes all mutator functions for manipulating state.  That way, we only
   * ever have to pass this entire object down through props (not necessarily the best design in terms of data
   * encapsulation, but it does have the benefit of being quite a bit simpler).
   */
  state = createState(this);
  
  

  /**
   * Render().
   */
  render() {
    return (

      <div className="appContainer">

        <div style={{ backgroundColor: 'black' }} className="toolbar">
          {this.state.currentView != "welcomeUser" && this.state.currentView != "farewellUser" && this.state.currentView != "registerMessage" && <Toolbar state={this.state} /> || <LogoBar />}
        </div>

        <div className="centerPage">
          {this.state.currentView === "welcome" && <WelcomeView state={this.state} />}

          {this.state.currentView === "login" && <Login state={this.state} />}

          {this.state.currentView === "register" && <Register state={this.state} />}

          {this.state.currentView === "welcomeUser" && <WelcomeUser state={this.state} />}

          {this.state.currentView === "farewellUser" && <FarewellUser />}

          {this.state.currentView === "registerMessage" && <RegisterMessage />}

          {this.state.currentView === "products" && <LoopProducts state={this.state} />
          }
          
        </div>

        <Footer />

      </div>
    );
   

  } /* End render(). */


} /* End class. */


export default BaseLayout;
