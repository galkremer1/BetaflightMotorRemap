import React, { Component } from "react";
import CSVReader from "react-csv-reader";
import { Slider } from "react-semantic-ui-range";
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
    const tableHeaderRows = [
      "PWM",
      "Thrust",
      "Voltage",
      "Current",
      "RPM",
      "Power",
      "Efficency",
    ];
    const { csvFileData } = this.state;

    return (
      <Grid padded style={{ width: "100%" }}>
        VTX Tables
      </Grid>
    );
  }
}
