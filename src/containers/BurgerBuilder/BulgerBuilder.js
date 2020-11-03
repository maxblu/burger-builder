import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { Route, Redirect } from 'react-router-dom';
import Checkout from '../Checkout/Checkout';
import { connect } from 'react-redux';
import * as actionTypes from '../../Store/actions';

const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 1.5,
};

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchasable: false,
      purchasing: false,
      loading: false,
      error: false,
    };
  }

  componentDidMount() {
    this.props.setIngredients('https://react-my-burger-4d1a1.firebaseio.com/ingredients.json');
    // this.props.setIngredients('https://localhost:8000/burger-builder/ingredients');
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.history.push('/auth');
    }
  };

  updatePurchaseState(ingredietns) {
    const sum = Object.keys(ingredietns)
      .map((igKey) => ingredietns[igKey])
      .reduce((newSum, el) => newSum + el, 0);
    // this.setState({purchasable:sum>0})
    return sum > 0;
  }

  addIngredientHandler = (type) => {
    this.props.addIngredient(type);
  };

  removeIngredientHandler = (type) => {
    this.props.subIngredient(type);
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    //alert('You continue')
    // this.setState({loading:true})
    // console.log(ingre);

    // const queryParams = [];

    // for( let i in this.props.ing){
    //     queryParams.push(encodeURIComponent(i) + '=' +encodeURIComponent(this.props.ing[i]))
    // }

    // queryParams.push('price='+ this.props.price)
    // const queryString = queryParams.join('&')

    // this.props.history.push( {
    //     pathname:'/checkout',
    //     search: '?'+queryString
    // });

    //Mi Via la linea de abajo
    this.props.history.push('/checkout/');
  };

  render() {
    console.log(this.props.token);
    const disableInfo = {
      ...this.props.ing,
    };

    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.state.error ? <p>Ingredients loss</p> : <Spinner />;

    if (this.props.ing) {
      burger = (
        <Aux>
          {' '}
          <Burger ingredients={this.props.ing} />
          <BurgerControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disableInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ing)}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
          ></BurgerControls>
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ing}
          purchaseCancel={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.price}
        ></OrderSummary>
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
      // orderSummary = <Redirect from='/burger-builder' to='/checkout'/>
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>

        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ing: state.ingredients,
    price: state.price,
    isAuthenticated: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIngredients: (endpoint) => dispatch(actionTypes.store_results(endpoint)),
    addIngredient: (value) => dispatch({ type: actionTypes.ADD_ING, key: value }),
    subIngredient: (value) => dispatch({ type: actionTypes.SUB_ING, key: value }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
