import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
const controls =[
    {label: 'Salad', type:'salad'},
    {label: 'Bacon', type:'bacon'},
    {label: 'Cheese', type:'cheese'},
    {label: 'Meat', type:'meat'}
];
const buildControls = (props) =>(
    <div className={classes.BuildControls}>
        <p>Current Price:<strong> {props.price.toFixed(2)} </strong></p>
        {controls.map(Ctrl =>(
            <BuildControl 
             key={Ctrl.label} 
             label={Ctrl.label}
             added={() => props.ingredientAdded(Ctrl.type)}
             removed={() => props.ingredientRemoved(Ctrl.type)}
             disabled={props.disabled[Ctrl.type]} />
        ))}
        <button 
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.purchase}> ORDER NOW </button>
    </div>
)

export default buildControls;