import axios from 'axios';
export const CART_ADD_ITEM = 'CART_ADD_ITEM';
export const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM';
export const CART_SAVE_SHIPPING_ADDRESS = 'CART_SAVE_SHIPPING_ADDRESS';
export const CART_SAVE_PAYMENT_METHOD = 'CART_SAVE_PAYMENT_METHOD';
export const CART_CLEAR_ITEMS = 'CART_CLEAR_ITEMS';

export const addToCart = (id, qty) => async (dispatch, getState) => {
   const config = {
      headers: {
         'Content-Type': 'application/json'
      }
   };
   const {
      data: { product }
   } = await axios.get(`/api/v1/products/single/${id}`, config);
   const [p] = product;
   dispatch({
      type: CART_ADD_ITEM,
      payload: {
         product: p.p_id,
         name: p.p_name,
         image: p.p_image,
         price: p.p_price,
         countInStock: p.p_quantity,
         qty
      }
   });

   localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = id => (dispatch, getState) => {
   dispatch({
      type: CART_REMOVE_ITEM,
      payload: id
   });

   localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = data => dispatch => {
   dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: data
   });

   localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = data => dispatch => {
   dispatch({
      type: CART_SAVE_PAYMENT_METHOD,
      payload: data
   });

   localStorage.setItem('paymentMethod', JSON.stringify(data));
};
