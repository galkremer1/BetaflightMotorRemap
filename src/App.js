import React, { Component } from "react";
import MotorsRemapTool from "./pages/MotorsRemapTool";
import MotorsThrustTool from "./pages/MotorsThrustTool";

import logo from "./images/kremerfpvlogo.png";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMotorsLayout: false,
      showThrustLayout: true,
    };
  }

  showRemapTool = () => {
    this.setState({
      showMotorsLayout: true,
    });
  };

  showThrustTool = () => {
    this.setState({
      showThrustLayout: true,
    });
  };
  backToMainMenu = () => {
    this.setState({
      showMotorsLayout: false,
      showThrustLayout: false,
    });
  };

  render() {
    const { showMotorsLayout, showThrustLayout } = this.state;
    return (
      <>
        <button style={{ float: "left" }} onClick={() => this.backToMainMenu()}>
          Main Menu
        </button>
        <div className="container" style={{ textAlign: "center" }}>
          <img
            alt="logo"
            className="logo"
            src={logo}
            onClick={() =>
              window.open("http://youtube.com/kremerFPV", "_blank")
            }
          />
          <div className={"jumbotron"}>
            <div className="row">
              {!(showThrustLayout || showMotorsLayout) && (
                <div className="main-menu-buttons-container">
                  <button
                    onClick={() => this.showRemapTool()}
                    className="btn btn-primary"
                  >
                    Motors Remap Tool
                  </button>
                  <button
                    onClick={() => this.showThrustTool()}
                    className="btn btn-primary"
                  >
                    Motors Thrust Tool
                  </button>
                </div>
              )}
              {showThrustLayout && <MotorsThrustTool />}
              {showMotorsLayout && <MotorsRemapTool />}
            </div>
          </div>
        </div>
      </>
    );
  }
}
