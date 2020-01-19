import { TextField } from "@material-ui/core";
import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import escImage from "../images/65a.png";

const StepButtons = ({
  goToStep,
  nextStep,
  previousStep,
  calculateMotorsResourceList,
  CLICOMMAND,
  motorsList,
  toggleModal,
  step
}) => (
  <div>
    <hr />
    {step === 1 && (
      <button
        disabled={!motorsList}
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
    {step === 3 && (
      <>
        <CopyToClipboard
          text={CLICOMMAND}
          onCopy={() => {
            toggleModal();
          }}
        >
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

export class First extends Component {
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
        <StepButtons step={1} {...this.props} />
      </div>
    );
  }
}

export class Second extends Component {
  render() {
    const { rotateESC, ESCAngle } = this.props;

    return (
      <div>
        <h4>Choose your ESC orientation</h4>
        <h4>Click the ESC to rotate it</h4>
        <img
          alt="ESC"
          onClick={rotateESC}
          className="ESC-Image"
          style={{
            transform: `rotate(${ESCAngle}deg)`
          }}
          src={escImage}
        />
        <StepButtons step={2} {...this.props} />
      </div>
    );
  }
}

export class Last extends Component {
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
          <code className="disable-select-text">
            <div>RESOURCE MOTOR 1 {motorsList["MOTOR1"]}</div>
            <div>RESOURCE MOTOR 2 {motorsList["MOTOR2"]}</div>
            <div>RESOURCE MOTOR 3 {motorsList["MOTOR3"]}</div>
            <div>RESOURCE MOTOR 4 {motorsList["MOTOR4"]}</div>
            <div>save</div>
          </code>
        </div>

        <StepButtons step={3} CLICOMMAND={CLICOMMAND} {...this.props} />
      </div>
    );
  }
}
