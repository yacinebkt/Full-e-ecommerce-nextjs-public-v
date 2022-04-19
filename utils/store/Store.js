import Cookies from 'js-cookie';
import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
    //darkMode: false,
    cart : {
        cartItems: Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')) : [],
        shippingAddress: Cookies.get('shippingAddress')
        ? JSON.parse(Cookies.get('shippingAddress'))
        : {},
        paymentMethod: Cookies.get('paymentMethod')
        ? Cookies.get('paymentMethod')
        : "",
    },


    // userInfo: Cookies.get('userInfo')
    // ? JSON.parse(Cookies.get('userInfo'))
    // : null,

    // userInfo: Cookies.get('userInfo')
    // ? Cookies.get('userInfo')
    // : null,

    userInfo: Cookies.get('userInfo')
    ? JSON.parse(Cookies.get('userInfo'))
    : null,

    darkMode: Cookies.get('darkMode') === 'ON'? true : false,


     
};


function reducer(state, action ) {
    switch (action.type) {
        case 'DARK_MODE_ON': 
            return {...state, darkMode: true};
        case 'DARK_MODE_OFF': 
            return {...state, darkMode: false};
        case 'ADD_CART_ITEM' : 
        {
            const newItem = action.payload;
            const checkItem = state.cart.cartItems.find(item => item._id === newItem._id )

            const cartItems = checkItem ? state.cart.cartItems.map((item) =>item.name === checkItem.name?newItem : item )
            : [...state.cart.cartItems, newItem];

            Cookies.set('cartItems', JSON.stringify(cartItems))
            //Cookies.set('cartItems', cartItems)
            return {...state, cart : {...state.cart, cartItems} }
        }

        case 'CART_CLEAR' : 
        return {...state, cart:{...state.cart, cartItems:[] } }

    case 'USER_LOGIN': 
        return { ...state, userInfo: action.payload };

        
    // case 'USER_LOGIN': {
    //     const userInfo = action.payload;
    //     Cookies.set('userInfo', JSON.stringify(userInfo))
    //     return { ...state, userInfo };
    // }
    case 'USER_LOGOUT':
        return { ...state, userInfo: null, cart: { cartItems: [], shippingAddress:{}, paymentMethod:'' } };

       

        case 'REMOVE_ITEM_FROM_CART' : 
        { 
            const cartItems =state.cart.cartItems.filter(item=> item._id !== action.payload._id)
            
            Cookies.set('cartItems', JSON.stringify(cartItems))
            return {...state, cart : {...state.cart, cartItems} }
        }


        case 'SAVE_SHIPPING_ADDRESS':
            return {
              ...state,
              cart: {
                ...state.cart,
                shippingAddress: action.payload,
              },
            };

        case 'SAVE_PAYMENT_METHOD' : 
            return {
                ...state,
                cart: {
                ...state.cart,
                paymentMethod: action.payload,
                },
            };


       
            
        default :
            return state;


    }
}


export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const value = {     state, dispatch}

    return <Store.Provider value={value}> {props.children} </Store.Provider>
}