import React, { Component } from 'react';
import Aux from '../Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/ToolBar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSideDrower: false,
    };
  }

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrower: false });
  };

  sideDrawerOpendHandler = () => {
    this.setState((prevState) => {
      return { showSideDrower: !prevState.showSideDrower };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar opened={this.sideDrawerOpendHandler} isAuth={this.props.isAuth}></Toolbar>
        <SideDrawer open={this.state.showSideDrower} isAuth={this.props.isAuth} closed={this.sideDrawerClosedHandler}></SideDrawer>

        <main className={classes.content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.token,
  };
};

export default connect(mapStateToProps)(Layout);
