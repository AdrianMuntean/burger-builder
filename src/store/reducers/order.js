import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    purchasing: false,
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchasing: false
            }
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderID
            }
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder),
                purchasing: true
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            };
        case actionTypes.FETCH_ORDERS_START:
            return{
                ...state,
                loading:true
            }
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return{
                    ...state,
                    orders: action.orders,
                    loading: false
        }
        case actionTypes.FETCH_ORDERS_FAILED:
                return{
                    ...state,
                    loading: false
        }
        default:
            return state;
    }
};

export default reducer;