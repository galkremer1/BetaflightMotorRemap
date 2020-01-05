import React, { Component, Fragment } from "react";
import StepWizard from "react-step-wizard";
import { TextField } from "@material-ui/core";
import escImage from "../images/65a.png";

import Nav from "./nav";
import Plugs from "./Plugs";

import transitions from "./transitions.css";
const styles = {};
/* eslint react/prop-types: 0 */

/**
 * A basic demonstration of how to use the step wizard
 */
export default class Wizard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {},
      transitions: {
        enterRight: `${transitions.animated} ${transitions.enterRight}`,
        enterLeft: `${transitions.animated} ${transitions.enterLeft}`,
        exitRight: `${transitions.animated} ${transitions.exitRight}`,
        exitLeft: `${transitions.animated} ${transitions.exitLeft}`,
        intro: `${transitions.animated} ${transitions.intro}`
      },
      demo: true // uncomment to see more
    };
  }

  updateForm = (key, value) => {
    const { form } = this.state;

    form[key] = value;
    this.setState({ form });
  };

  // Do something on step change
  onStepChange = stats => {
    // console.log(stats);
  };

  setInstance = SW => this.setState({ SW });

  render() {
    const { SW, demo } = this.state;

    return (
      <div className="container" style={{ textAlign: "center" }}>
        <h3>Betaflight Motor Remap Helper</h3>
        <div className={"jumbotron"}>
          <div className="row">
            <div className={`col-12 col-sm-6 offset-sm-3`}>
              <StepWizard
                onStepChange={this.onStepChange}
                isHashEnabled
                transitions={this.state.transitions} // comment out this line to use default transitions
                // nav={<Nav />}
                instance={this.setInstance}
              >
                <First hashKey={"getResources"} update={this.updateForm} />
                <Second form={this.state.form} />
                <Progress />
                <Last hashKey={"TheEnd!"} />
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
  state = {
    resourceListInput: "CLI Resource",
    userMotorsValue: {}
  };
  update = e => {
    this.props.update(e.target.name, e.target.value);
  };

  handleChange = event => {
    this.updateMotorValues(event.target.value);
  };

  updateMotorValues = resourceList => {
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
    console.log(motorsList);
  };

  render() {
    return (
      <div>
        <TextField
          fullWidth={true}
          placeholder={"test"}
          multiline={true}
          rows={4}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

class Second extends Component {
  state = {
    ESCAngle: 360
  };

  rotateESC = () => {
    const { ESCAngle } = this.state;
    console.log(ESCAngle);
    this.setState({ ESCAngle: (ESCAngle % 360) + 90 });
  };
  render() {
    const { ESCAngle } = this.state;

    return (
      <div>
        <img
          onClick={this.rotateESC}
          style={{ width: 400, transform: `rotate(${ESCAngle}deg)` }}
          src={escImage}
        />
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
        }, 3000)
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
        <p className="text-center">Automated Progress...</p>
        <div className={`${styles.progress} ${this.state.isActiveClass}`}>
          <div className={`${styles["progress-bar"]} progress-bar-striped`} />
        </div>
      </div>
    );
  }
}

class Last extends Component {
  submit = () => {
    alert("You did it! Yay!"); // eslint-disable-line
  };

  render() {
    return (
      <div>
        <div className={"text-center"}>
          <h3>This is the last step in this example!</h3>
          <hr />
          <Plugs />
        </div>
      </div>
    );
  }
}
