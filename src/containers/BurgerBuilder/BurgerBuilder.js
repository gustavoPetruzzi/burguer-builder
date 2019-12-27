import React, {Component} from 'react';
import Aux from '../../hoc/Auxi/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { initIngredients } from '../../store/actions/burgerBuilder';

class BurgerBuilder extends Component {

    state ={
        
        purchasing: false,

    }
    componentDidMount(){
        this.props.onInitIngredients();

    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey =>{
                return ingredients[igKey];
            })
            .reduce((sum, el) =>{
                return sum + el;
            }, 0);

        return  sum > 0;
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({purchasing: true});    
        }
        else{
            // Despues de loguearse, el usuario va directo al checkout (porque ya armo la hamburguesa)
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }
    
    purchaseCancelHandler = () =>{
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () =>{
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }
    render(){
        const disabledInfo ={
            ...this.props.ings,
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        if(this.props.ings){

            orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinue = {this.purchaseContinueHandler}
                price={this.props.prc}
                /> 
        }
        let burger =  this.props.error ? <p>Ingredients can't be loader</p> : <Spinner />
        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    price={this.props.prc}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    isAuth={this.props.isAuthenticated}
                    purchase={this.purchaseHandler}
                    />
                </Aux> );
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler }> 
                    {orderSummary}
                </Modal>
                {burger}
                
            </Aux>
        )
    }
}

const mapStateToProps = state =>{
    return{
        ings: state.burgerBuilder.ingredients,
        prc: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase : () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) =>dispatch(actions.setAuthRedirectPath(path)),
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));