import React, { Component } from "react";

export default class Progress extends Component {
  state = {
    timeout: null
  };

  componentDidUpdate() {
    const { timeout } = this.state;

    if (this.props.isActive && !timeout) {
      this.setState({
        timeout: setTimeout(() => {
          this.props.nextStep();
        }, 1000)
      });
    } else if (!this.props.isActive && timeout) {
      clearTimeout(timeout);
      this.setState({
        timeout: null
      });
    }
  }

  render() {
    return (
      <div>
        <p className="text-center">Calculating...</p>
      </div>
    );
  }
}
