import React, { Component } from "react";
import StepWizard from "react-step-wizard";
import { First, Second, Last } from "./steps/Steps";
import Progress from "./steps/Progress";

const ESCLayout = {
  0: ["MOTOR1", "MOTOR2", "MOTOR3", "MOTOR4"],
  90: ["MOTOR2", "MOTOR4", "MOTOR1", "MOTOR3"],
  180: ["MOTOR4", "MOTOR3", "MOTOR2", "MOTOR1"],
  270: ["MOTOR3", "MOTOR1", "MOTOR4", "MOTOR2"]
};

export default class Application extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {},
      ESCAngle: 0,
      motorsList: "",
      newMotorsResourceList: {}
    };
  }

  rotateESC = () => {
    const { ESCAngle } = this.state;
    this.setState({ ESCAngle: (ESCAngle + 90) % 360 });
  };

  setInstance = SW => this.setState({ SW });

  updateMotorsList = motorsList => {
    this.setState({ motorsList });
    console.log(motorsList);
  };

  calculateMotorsResourceList = () => {
    const { motorsList, ESCAngle } = this.state;
    const newMotorsResourceList = {};
    ESCLayout[ESCAngle].forEach((motor, i) => {
      newMotorsResourceList["MOTOR" + (i + 1)] = motorsList[motor];
    });
    this.setState({ newMotorsResourceList });
  };

  render() {
    const { ESCAngle, newMotorsResourceList, motorsList } = this.state;
    return (
      <div className="container" style={{ textAlign: "center" }}>
        <h3>Betaflight Motor Remap Helper</h3>
        <div className={"jumbotron"}>
          <div className="row">
            <div className={`col-12 col-sm-6 offset-sm-3`}>
              <StepWizard
                onStepChange={this.onStepChange}
                isHashEnabled={false}
                instance={this.setInstance}
              >
                <First
                  hashKey={"getResources"}
                  motorsList={motorsList}
                  updateMotorsList={this.updateMotorsList}
                />
                <Second
                  rotateESC={this.rotateESC}
                  ESCAngle={ESCAngle}
                  calculateMotorsResourceList={this.calculateMotorsResourceList}
                />
                <Progress />
                <Last motorsList={newMotorsResourceList} />
              </StepWizard>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
