import React from 'react';
import styles from './BuildControls.module.css';
import BuildControl from './buildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => {
  return (
    <div className={styles.BuildControls}>
      <p>
        Current Prices: <strong>{props.price.toFixed(2)}</strong>{' '}
      </p>
      {controls.map((ctrl) => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          added={() => props.ingredientAdded(ctrl.type)}
          removed={() => props.ingredientRemoved(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
        ></BuildControl>
      ))}
      <button className={styles.OrderButton} disabled={!props.purchasable} onClick={props.ordered}>
        {props.isAuth ? 'ORDER NOW' : 'Sign UP!'}
      </button>
    </div>
  );
};

export default buildControls;
