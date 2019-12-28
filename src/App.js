import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './style/style';
import './style/loading.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div> TEST
      </div>
    );
  }
}

export default withStyles(styles)(App);
