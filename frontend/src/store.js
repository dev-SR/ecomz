import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'; //reducers
import { userReducer } from './Redux/reducer/user-reduer';

const reducers = combineReducers({
   user: userReducer
});

const initialState = {
   user: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : {}
};
const middleware = [thunk];
const store = createStore(
   reducers,
   initialState,
   composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
