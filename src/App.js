import React, { Component } from "react";
import StepWizard from "react-step-wizard";
import { First, Second, Last } from "./steps/Steps";
import SupportModal from "./steps/supportModal";
import Progress from "./steps/Progress";
import logo from "./images/kremerfpvlogo.png";

const ESCLayout = {
  0: ["MOTOR1", "MOTOR2", "MOTOR3", "MOTOR4"],
  90: ["MOTOR2", "MOTOR4", "MOTOR1", "MOTOR3"],
  180: ["MOTOR4", "MOTOR3", "MOTOR2", "MOTOR1"],
  270: ["MOTOR3", "MOTOR1", "MOTOR4", "MOTOR2"]
};
const flippedESCLayout = {
  0: ["MOTOR3", "MOTOR4", "MOTOR1", "MOTOR2"],
  90: ["MOTOR4", "MOTOR2", "MOTOR3", "MOTOR1"],
  180: ["MOTOR2", "MOTOR1", "MOTOR4", "MOTOR3"],
  270: ["MOTOR1", "MOTOR3", "MOTOR3", "MOTOR4"]
};

export default class Application extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {},
      ESCAngle: 0,
      isESCFlipped: false,
      motorsList: "",
      newMotorsResourceList: {},
      isModalOpen: false
    };
  }

  rotateESC = () => {
    const { ESCAngle } = this.state;
    this.setState({ ESCAngle: (ESCAngle + 90) % 360 });
  };

  flipEsc = () => {
    const { isESCFlipped } = this.state;
    this.setState({ isESCFlipped: !isESCFlipped });
  };

  toggleModal = () => {
    const { isModalOpen } = this.state;
    this.setState({ isModalOpen: !isModalOpen });
  };

  setInstance = SW => this.setState({ SW });

  updateMotorsList = motorsList => {
    this.setState({ motorsList });
    console.log(motorsList);
  };

  calculateMotorsResourceList = () => {
    const { motorsList, ESCAngle, isESCFlipped } = this.state;
    let escLayout = ESCLayout;
    if (isESCFlipped) {
      escLayout = flippedESCLayout;
    }
    const newMotorsResourceList = {};
    escLayout[ESCAngle].forEach((motor, i) => {
      newMotorsResourceList["MOTOR" + (i + 1)] = motorsList[motor];
    });
    this.setState({ newMotorsResourceList });
  };

  render() {
    const {
      ESCAngle,
      isESCFlipped,
      newMotorsResourceList,
      motorsList,
      isModalOpen
    } = this.state;
    return (
      <>
        <div className="container" style={{ textAlign: "center" }}>
          <img
            alt="logo"
            className="logo"
            src={logo}
            onClick={() =>
              window.open("http://youtube.com/kremerFPV", "_blank")
            }
          />
          <h3>Betaflight Motor Remap Helper</h3>
          <a href="https://youtu.be/ziQSpe7gIvM" target="_blank">
            <h4>Need Help?</h4>
          </a>
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
                    flipEsc={this.flipEsc}
                    isESCFlipped={isESCFlipped}
                    ESCAngle={ESCAngle}
                    calculateMotorsResourceList={
                      this.calculateMotorsResourceList
                    }
                  />
                  <Progress />
                  <Last
                    motorsList={newMotorsResourceList}
                    toggleModal={this.toggleModal}
                  />
                </StepWizard>
              </div>
            </div>
          </div>
        </div>
        <SupportModal
          isModalOpen={isModalOpen}
          toggleModal={this.toggleModal}
        />
      </>
    );
  }
}
