import * as action_types from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
 
const reducer = (state = initialState, action) =>{
    switch (action.type) {
        case action_types.ADD_INGREDIENT:

            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
            }

        
        case action_types.REMOVE_INGREDIENT:
            console.log(action, state);
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] -1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName]

            }
        case action_types.SET_INGREDIENTS:
            return{
                ...state,
                ingredients: action.ingredients,
                error: false
            }
        case action_types.FETCH_INGREDIENTS_FAILED:
            return{
                ...state,
                error: true
            }
        default:
            return state;
    }
    return state;
}

export default reducer;