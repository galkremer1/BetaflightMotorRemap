import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './style/style';
import { TextField } from '@material-ui/core';
import escImage from './images/65a.png'
import './style/loading.css';

const ESCLayout = { 
                    0: ['M1', 'M2', 'M3', 'M4'],
                    90: ['M1', 'M2', 'M3', 'M4']
                  }

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      resourceListInput: 'CLI Resource',
      userMotorsValue: {},
      ESCAngle: 360
    };
  }

  componentDidMount() {
  }

  updateMotorValues = (resourceList) =>{
    const resourceListArray = resourceList.match(/[^\r\n]+/g);
    let motorNum = 1;
    const motorsList = {};
    resourceListArray && resourceListArray.forEach((line) => {
      const indexOfMatchedString = line.indexOf('MOTOR ' + motorNum);
      if (indexOfMatchedString > -1 ) {
        motorsList['MOTOR' + motorNum] = line.slice(indexOfMatchedString + 8);
        motorNum++;
      }
    })
    console.log(motorsList);
  }

  handleChange = (event) => {
    this.setState({resourceListInput: event.target.value });
    this.updateMotorValues(event.target.value);

  }

  rotateESC = () =>{
    const {ESCAngle} = this.state;
    console.log(ESCAngle);
    this.setState({ESCAngle: ESCAngle%360 + 90});
  }

  render() {
    const {ESCAngle} = this.state;
    return (
      <>
        <TextField fullWidth={true} placeholder={'test'} multiline={true} rows={4} value={this.state.value} onChange={this.handleChange} />
        <img onClick={this.rotateESC} style={{width: 200,transform: `rotate(${ESCAngle}deg)`}}src={escImage}/>
      </>
    );
  }
}

export default withStyles(styles)(App);
