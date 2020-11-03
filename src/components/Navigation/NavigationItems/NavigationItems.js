import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import { connect } from 'react-redux';

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/burger-builder">Burger Builder</NavigationItem>
      {props.isAuth ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
      {props.isAuth ? <NavigationItem link="/logout">Log out</NavigationItem> : <NavigationItem link="/auth">Authenticate</NavigationItem>}
    </ul>
  );
};

export default navigationItems;
