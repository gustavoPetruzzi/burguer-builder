import * as action_types from './actions';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
    },
    totalPrice: 4,
}

const reducer = (state = initialState, action) =>{
    switch (action.type) {
        case action_types.ADD_INGREDIENT:

            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1

                }
            }
        case action_types.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredientName[action.ingredientName] -1
                }
            }
        default:
            return state;
    }
    return state;
}

export default reducer;