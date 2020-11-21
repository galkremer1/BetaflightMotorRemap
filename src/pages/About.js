import React, { Component } from "react";

import "semantic-ui-css/semantic.min.css";
import {
  Segment,
  Grid,
  Label,
  Input,
  Icon,
  Menu,
  Table,
} from "semantic-ui-react";
import underConstruction from "../images/under-construction.png";

import styled from "styled-components";

const MaterialInput = styled(Input)`
  border: unset;
`;

export default class VtxTables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startValue: 10,
      value: 0,
    };
  }

  handleFileChange(data, fileInfo) {
    debugger;
    this.setState({
      csvFileData: data,
    });
  }

  render() {
    return (
      <Grid padded style={{ width: "100%" }}>
        <img
          src={underConstruction}
          style={{ width: "200px", margin: "auto" }}
        />
      </Grid>
    );
  }
}
