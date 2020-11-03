import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../ContactData/ContactData';
import { Route } from 'react-router-dom';
import {connect} from 'react-redux';
// import mapStateToProps from '../BurgerBuilder/BulgerBuilder';

class Checkout extends Component {
    state = { 
        ingredients:null,
        price: null
     }

    
    rejectHandler = ()=> {
        console.log(this.props);
        this.props.history.goBack();
    }

    acceptHandler = () =>{
        this.props.history.replace('/checkout/contact-data')

    }

    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};

    //     for (let param of query.entries()){

    //         param[0] !== 'price' ? ingredients[param[0]] = +param[1] : this.setState({price: +param[1]});
    //     }

    //     this.setState({ingredients:ingredients})
        
    //     //Mi via 
    //     // this.setState({ingredients: { ...this.props.location.state}})

        
    // }




    render() { 
        console.log(this.props);
        return ( 
            <div>
                <CheckoutSummary reject={this.rejectHandler} accept={this.acceptHandler} ingredients={this.props.ing} />

                 
                <Route path={this.props.match.url+ '/contact-data'} component={ContactData} ></Route>
           
           </div>
         );
    }
}

const mapStateToProps = (state) =>{
    return {
        ing: state.ingredients,
        price: state.price
    };
}




export default connect(mapStateToProps,)(Checkout);