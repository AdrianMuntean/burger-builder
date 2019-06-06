import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderID: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
            .then(response => {
                console.log(response);
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            }
            )
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            });
    }
}

export const purchaseInit = () => ({
        type: actionTypes.PURCHASE_INIT
});

export const fetchOrdersSucces = (orders) => ({
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
});

export const fetchOrdersFail = (error) => ({
    type: actionTypes.FETCH_ORDERS_FAILED,
    error: error   
});

export const fetchOrdersStart = () => ({
    type: actionTypes.FETCH_ORDERS_START
});

export const fetchOrders = () => {
    return dispatch => {
    dispatch(fetchOrdersStart());
    axios.get('/orders.json').then(res => {
        console.log("res")
        console.log(res)
        const fetchedOrders = [];
        for (let key in res.data) {
            fetchedOrders.push({...res.data[key], id: key});
        }
        dispatch(fetchOrdersSucces(fetchedOrders));
    })
    .catch(err => {
        dispatch(fetchOrdersFail(err))
        console.log("error! ", err);
    });
}
}