import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (orderId, orderData) => {
    return{
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderData: orderData,
        orderId: orderId  
    };
};

export const purchaseBurgerStart = () => {
    return{
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurgerFail = (error) => {
    return{
        type: actionTypes.PURCHASE_BURGER_FAIL,
       error: error 
    };
};

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post( '/orders.json', orderData )
        .then( response => {
            console.log(response.data);
            dispatch(purchaseBurgerSuccess(response.data.name, orderData))
        } )
        .catch( error => {
            dispatch(purchaseBurgerFail(error));
        } );
    }
};

export const purchaseinit = () => {
    return{
        type: actionTypes.PURCHASE_INIT
    };
};

export const fetchOrderSuccess = (order) => {
    return{
        type: actionTypes.FETCH_ORDER_SUCCESS,
        order: order
    };
};

export const fetchOrderFail = (error) => {
    return{
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const fetchOrderStart = () => {
    return{
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const fetchOrders = () => {

    return dispatch => {
        dispatch(fetchOrderStart());
        axios.get('/orders.json')
        .then(res => {
            const fetchedOrders = [];
            for (let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            dispatch(fetchOrderSuccess(fetchedOrders));
        })
        .catch(error => {
            dispatch(fetchOrderFail(error));
        })
    }
};
