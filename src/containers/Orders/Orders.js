import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';

class Orders extends Component {
  state = {
    orders: [],
    loading: false,
  };

  componentDidMount() {
    axios
      .get('/orders.json?auth=' + this.props.tokenID)
      .then((response) => {
        console.log(response.data);

        const fetchedOrders = [];

        for (let key in response.data) {
          fetchedOrders.push({ ...response.data[key], id: key });
        }

        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  }

  render() {
    let orders = this.state.orders.map((order) => <Order key={order.id} price={order.price} ingredients={order.ingredients} />);

    if (this.state.loading) {
      orders = <Spinner />;
    }

    return <div>{orders}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    tokenID: state.token,
  };
};

export default connect(mapStateToProps)(withErrorHandler(Orders, axios));
