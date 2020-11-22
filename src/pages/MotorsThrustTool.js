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

export default class MotorsThrustTool extends Component {
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
        <Grid.Column width={15}>
          <Segment>
            <CSVReader onFileLoaded={this.handleFileChange.bind(this)} />
          </Segment>
          {csvFileData && (
            <>
              {" "}
              <Segment>
                <h1>PWM</h1>
                <p>
                  <Slider
                    color="red"
                    inverted={false}
                    settings={{
                      start: this.state.startValue,
                      min: 10,
                      max: 100,
                      step: 10,
                      onChange: (value) => {
                        this.setState({
                          startValue: value,
                        });
                      },
                    }}
                  />
                </p>
                <Label color="red">{this.state.startValue}%</Label>
              </Segment>
              <Segment>
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      {csvFileData[0].map((header) => {
                        return <Table.HeaderCell>{header}</Table.HeaderCell>;
                      })}
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    <Table.Row>
                      {csvFileData[this.state.startValue / 10].map((value) => {
                        return (
                          <Table.Cell>
                            {Math.round(
                              (Number(value) + Number.EPSILON) * 100
                            ) / 100}
                          </Table.Cell>
                        );
                      })}
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Segment>
              <Segment>
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      {csvFileData[0].map((header) => {
                        return <Table.HeaderCell>{header}</Table.HeaderCell>;
                      })}
                    </Table.Row>
                  </Table.Header>

                  <Table.Body className="thrust-results-body">
                    {csvFileData.map((data, index) => {
                      if (index > 0) {
                        return (
                          <Table.Row>
                            {data.map((value) => {
                              debugger;
                              return (
                                <Table.Cell>
                                  {Math.round(
                                    (Number(value) + Number.EPSILON) * 100
                                  ) / 100}
                                </Table.Cell>
                              );
                            })}
                          </Table.Row>
                        );
                      }
                    })}
                  </Table.Body>
                </Table>
              </Segment>
            </>
          )}
        </Grid.Column>
      </Grid>
    );
  }
}
