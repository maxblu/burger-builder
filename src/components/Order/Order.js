import React from 'react';
import classes from './Order.module.css'

const order = (props) => {

    let aux = [];
    let ingredients = ' ';

    for (let key in props.ingredients){
        aux.push( key + ' ('+props.ingredients[key]+')');
    }

    ingredients = aux.join(' ')


    return ( 
        <div className={classes.Order}>
            <p>Ingredients : {ingredients} </p>
            <p>Price: <strong>{props.price.toFixed(2)}</strong></p>

        </div>
     );
}
 
export default order;