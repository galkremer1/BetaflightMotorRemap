import React, { Component } from "react";
import MotorsRemapTool from "./pages/MotorsRemapTool";
import MotorsThrustTool from "./pages/MotorsThrustTool";
import OpenTxLogHelper from "./pages/OpenTXlogHelper";
import VtxTabls from "./pages/VTX-Tables";

import logo from "./images/kremerfpvlogo.png";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMotorsLayout: false,
      showThrustLayout: false,
      ShowVtxTables: false,
      ShowOpenTxLogger: true,
    };
  }

  showRemapTool = () => {
    this.setState({
      showMotorsLayout: true,
    });
  };

  showPage = (page) => {
    this.setState(page);
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
      ShowOpenTxLogger: false,
      ShowVtxTables: false,
    });
  };

  render() {
    const {
      showMotorsLayout,
      showThrustLayout,
      ShowOpenTxLogger,
      ShowVtxTables,
    } = this.state;
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
              {!(
                showThrustLayout ||
                showMotorsLayout ||
                ShowVtxTables ||
                ShowOpenTxLogger
              ) && (
                <div className="main-menu-buttons-container">
                  <div>
                    <button
                      onClick={() => this.showPage({ showMotorsLayout: true })}
                      className="btn btn-primary"
                    >
                      Motors Remap Tool
                    </button>
                    <button
                      onClick={() => this.showPage({ showThrustLayout: true })}
                      className="btn btn-primary"
                    >
                      Motors Thrust Tool
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => this.showPage({ ShowVtxTables: true })}
                      className="btn btn-primary"
                    >
                      VTX Tables
                    </button>
                    <button
                      onClick={() => this.showPage({ ShowOpenTxLogger: true })}
                      className="btn btn-primary"
                    >
                      OpenTx Log Helper
                    </button>
                  </div>
                </div>
              )}
              {showThrustLayout && <MotorsThrustTool />}
              {showMotorsLayout && <MotorsRemapTool />}
              {ShowOpenTxLogger && <OpenTxLogHelper />}
              {ShowVtxTables && <VtxTabls />}
            </div>
          </div>
        </div>
      </>
    );
  }
}
