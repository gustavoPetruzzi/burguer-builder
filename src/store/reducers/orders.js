import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';
const initialState={
    orders: [],    
    loading:false,
    purchased: false
}

const purchaseInit = (state, action) =>{
    return updateObject(state, {purchased: false});
}

const purchaseBurgerStart = (state, action) =>{
    return updateObject(state, {loading: true});
}

const purchaseBurgerSuccess = (state, action) =>{
    const newOrder = updateObject(action.orderData, { id: action.orderId });

    return updateObject(state, {
        orders: state.orders.concat(newOrder),
        loading:false,
        purchased: true,                
    })   
}

const reducer = (state = initialState, action) =>{
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: purchaseInit(state, action);

        case actionTypes.PURCHASE_BURGER_START: purchaseBurgerStart(state, action);

        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = updateObject(action.orderData, { id: action.orderId });

            return updateObject(state, {
                orders: state.orders.concat(newOrder),
                loading:false,
                purchased: true,                
            })


        case actionTypes.PURCHASE_BURGER_FAIL:
            return updateObject(state, {loading: false});

            
        case actionTypes.FETCH_ORDERS_START:
            return updateObject(state, {loading: true});

        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateObject(state, {
                loading: false,
                orders: action.orders
            })

        case actionTypes.FETCH_ORDERS_FAIL:
            return updateObject(state, {loading: false});

        default:
            return state;
    }
};

export default reducer;