import React, { Component, Fragment } from "react";
import StepWizard from "react-step-wizard";
import { TextField } from "@material-ui/core";
import escImage from "../images/65a.png";
import { CopyToClipboard } from "react-copy-to-clipboard";
import transitions from "./transitions.css";
import Plugs from "./Plugs";
const styles = {};

const ESCLayout = {
  0: ["MOTOR1", "MOTOR2", "MOTOR3", "MOTOR4"],
  90: ["MOTOR2", "MOTOR4", "MOTOR1", "MOTOR3"],
  180: ["MOTOR4", "MOTOR3", "MOTOR2", "MOTOR1"],
  270: ["MOTOR3", "MOTOR1", "MOTOR4", "MOTOR2"]
};

export default class Wizard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {},
      ESCAngle: 0,
      motorsList: "",
      newMotorsResourceList: {},
      transitions: {
        enterRight: `${transitions.animated} ${transitions.enterRight}`,
        enterLeft: `${transitions.animated} ${transitions.enterLeft}`,
        exitRight: `${transitions.animated} ${transitions.exitRight}`,
        exitLeft: `${transitions.animated} ${transitions.exitLeft}`,
        intro: `${transitions.animated} ${transitions.intro}`
      }
      // demo: true // uncomment to see more
    };
  }

  // Do something on step change
  onStepChange = stats => {
    console.log(stats);
  };

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
    const {
      SW,
      demo,
      ESCAngle,
      newMotorsResourceList,
      motorsList
    } = this.state;
    return (
      <div className="container" style={{ textAlign: "center" }}>
        <h3>Betaflight Motor Remap Helper</h3>
        <div className={"jumbotron"}>
          <div className="row">
            <div className={`col-12 col-sm-6 offset-sm-3`}>
              <StepWizard
                onStepChange={this.onStepChange}
                isHashEnabled={false}
                transitions={this.state.transitions} // comment out this line to use default transitions
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
        {demo && SW && <InstanceDemo SW={SW} />}
      </div>
    );
  }
}

/** Demo of using instance */
const InstanceDemo = ({ SW }) => (
  <Fragment>
    <button className={"btn btn-secondary"} onClick={SW.previousStep}>
      Previous Step
    </button>
    &nbsp;
    <button className={"btn btn-secondary"} onClick={SW.nextStep}>
      Next Step
    </button>
  </Fragment>
);

/** Steps */

class First extends Component {
  state = {};

  updateMotorValues = event => {
    const { updateMotorsList } = this.props;
    const resourceList = event.target.value;
    const resourceListArray = resourceList.match(/[^\r\n]+/g);
    let motorNum = 1;
    const motorsList = {};
    resourceListArray &&
      resourceListArray.forEach(line => {
        const indexOfMatchedString = line.indexOf("MOTOR " + motorNum);
        if (indexOfMatchedString > -1) {
          motorsList["MOTOR" + motorNum] = line.slice(indexOfMatchedString + 8);
          motorNum++;
        }
      });
    if (Object.keys(motorsList).length >= 4) {
      updateMotorsList(motorsList);
    } else {
      updateMotorsList("");
    }
  };

  render() {
    return (
      <div>
        <TextField
          fullWidth={true}
          placeholder={"Enter CLI Dump Values"}
          multiline={true}
          rows={4}
          value={this.state.value}
          onChange={this.updateMotorValues}
        />
        <Stats step={1} {...this.props} />
      </div>
    );
  }
}

class Second extends Component {
  render() {
    const { rotateESC, ESCAngle } = this.props;

    return (
      <div>
        <h4>Choose your ESC orientation</h4>
        <h4>Click the ESC to rotate it</h4>
        <img
          onClick={rotateESC}
          style={{
            width: 400,
            cursor: "pointer",
            transform: `rotate(${ESCAngle}deg)`
          }}
          src={escImage}
        />
        <Stats step={2} {...this.props} />
      </div>
    );
  }
}

class Progress extends Component {
  state = {
    isActiveClass: "",
    timeout: null
  };

  componentDidUpdate() {
    const { timeout } = this.state;

    if (this.props.isActive && !timeout) {
      this.setState({
        // isActiveClass: styles.loaded,
        timeout: setTimeout(() => {
          this.props.nextStep();
        }, 1000)
      });
    } else if (!this.props.isActive && timeout) {
      clearTimeout(timeout);
      this.setState({
        isActiveClass: "",
        timeout: null
      });
    }
  }

  render() {
    return (
      <div className={styles["progress-wrapper"]}>
        <p className="text-center">Calculating...</p>
        <div className={`${styles.progress} ${this.state.isActiveClass}`}>
          <div className={`${styles["progress-bar"]} progress-bar-striped`} />
        </div>
      </div>
    );
  }
}

class Last extends Component {
  render() {
    const { motorsList } = this.props;
    const CLICOMMAND = `RESOURCE MOTOR 1 ${motorsList["MOTOR1"]};
                    RESOURCE MOTOR 2 ${motorsList["MOTOR2"]};
                    RESOURCE MOTOR 3 ${motorsList["MOTOR3"]};
                    RESOURCE MOTOR 4 ${motorsList["MOTOR4"]};save;`;
    return (
      <div>
        <div className={"text-center"}>
          <h3>Please Paste This In The CLI:</h3>
          <hr />
          <code>
            <div>RESOURCE MOTOR 1 {motorsList["MOTOR1"]}</div>
            <div>RESOURCE MOTOR 2 {motorsList["MOTOR2"]}</div>
            <div>RESOURCE MOTOR 3 {motorsList["MOTOR3"]}</div>
            <div>RESOURCE MOTOR 4 {motorsList["MOTOR4"]}</div>
            <div>save</div>
          </code>
          <Plugs />
        </div>

        <Stats step={3} CLICOMMAND={CLICOMMAND} {...this.props} />
      </div>
    );
  }
}

const Stats = ({
  currentStep,
  firstStep,
  goToStep,
  lastStep,
  nextStep,
  previousStep,
  totalSteps,
  calculateMotorsResourceList,
  CLICOMMAND,
  motorsList,
  step
}) => (
  <div>
    <hr />
    {step === 1 && (
      <button
        // disabled={!motorsList}
        className="btn btn-primary btn-block"
        onClick={nextStep}
      >
        Continue
      </button>
    )}

    {step === 2 && (
      <button
        className="btn btn-primary btn-block"
        onClick={() => {
          calculateMotorsResourceList();
          nextStep();
        }}
      >
        Continue
      </button>
    )}

    {step > 1 && step !== 3 && (
      <button className="btn btn-danger btn-block" onClick={previousStep}>
        Go Back
      </button>
    )}
    {step == 3 && (
      <>
        <CopyToClipboard text={CLICOMMAND} onCopy={() => {}}>
          <button className="btn btn-primary btn-block">
            Copy values to clipboard
          </button>
        </CopyToClipboard>
        <button
          className="btn btn-danger btn-block"
          onClick={() => {
            goToStep(2);
          }}
        >
          Go Back
        </button>
      </>
    )}
    <hr />
  </div>
);
