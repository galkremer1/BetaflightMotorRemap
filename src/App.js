import React, { Component } from "react";
import MotorsRemapTool from "./pages/MotorsRemapTool";
import MotorsThrustTool from "./pages/MotorsThrustTool";
import OpenTxLogHelper from "./pages/OpenTXlogHelper";
import VtxTabls from "./pages/VTX-Tables";
import { Grid, Menu, Segment } from "semantic-ui-react";

import logo from "./images/kremerfpvlogo.png";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: "Motors Remap Tool",
      menuItems: [
        "Motors Remap Tool",
        "DJI Subtitles Tool",
        "Motors Thrust Tool",
        "VTX Tables",
        "About",
      ],
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

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

  renderActiveItem = (activeItem) => {
    switch (activeItem) {
      case "Motors Thrust Tool":
        return <MotorsThrustTool />;
      case "Motors Remap Tool":
        return <MotorsRemapTool />;
      case "DJI Subtitles Tool":
        return <OpenTxLogHelper />;
      case "VTX Tables":
        return <VtxTabls />;
    }
  };

  render() {
    const { menuItems, activeItem } = this.state;
    return (
      <>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => window.open("http://youtube.com/kremerFPV", "_blank")}
        >
          <img alt="logo" className="logo" src={logo} />
          Gal Kremer
        </div>

        <Grid>
          <Grid.Column width={3}>
            <Menu fluid vertical tabular>
              {menuItems.map((item) => {
                return (
                  <Menu.Item
                    name={item}
                    active={activeItem === item}
                    onClick={this.handleItemClick}
                  />
                );
              })}
            </Menu>
          </Grid.Column>

          <Grid.Column stretched width={13}>
            <Segment>
              <div className="container" style={{ textAlign: "center" }}>
                <div className={"jumbotron"}>
                  <div className="row">{this.renderActiveItem(activeItem)}</div>
                </div>
              </div>
            </Segment>
          </Grid.Column>
        </Grid>
      </>
    );
  }
}
