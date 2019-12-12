import * as actionTypes from '../actions/actionTypes';

const initialState={
    order: [],    
    loading:false
}

const reducer = (state= initialState, action) =>{
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS:

        case actionTypes.PURCHASE_BURGER_FAIL:

        default:
    }
}