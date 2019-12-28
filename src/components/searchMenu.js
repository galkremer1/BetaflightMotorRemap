import React, { Component } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../style/style';


class searchMenu extends Component {
  state = {
    open: false,
  };

  handleToggle = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  handleClose = (event) => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ open: false });
  };

  toggleSearchHistory = () => {
    const { toggleSearchHistory } = this.props;
    this.setState({ open: false }, toggleSearchHistory());
  }

  render() {
    const { classes, showSearchHistory, clearSearchHistory} = this.props;
    const { open } = this.state;

    return (
      <div className={classes.menuPaper}>
        <div>
          <IconButton buttonRef={node => {
            this.anchorEl = node;
          }} className={classes.iconButton} aria-label="Menu" onClick={this.handleToggle}>
            <MenuIcon />
          </IconButton>
          <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList>
                      <MenuItem onClick={this.toggleSearchHistory}>
                        {showSearchHistory ? 'Show Gallery' : 'Search History'}
                      </MenuItem>
                      {showSearchHistory && <MenuItem onClick={clearSearchHistory}>
                        Clear History
                      </MenuItem>}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(searchMenu);
