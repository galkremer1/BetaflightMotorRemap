import React, { Component } from "react";

import { Slider } from "react-semantic-ui-range";
import "semantic-ui-css/semantic.min.css";
import { Segment, Grid, Label, Input } from "semantic-ui-react";
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

  handleValueChange(e, { value }) {
    this.setState({
      value: value,
    });
  }

  render() {
    return (
      <Grid padded style={{ width: "100%" }}>
        <Grid.Column width={100}>
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
        </Grid.Column>
      </Grid>
    );
  }
}
