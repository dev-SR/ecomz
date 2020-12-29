import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'; //reducers
import {
   userReducer,
   categoryReducer,
   categoryUpdateReducer,
   categoryDeleteReducer
} from './Redux/reducer/user-reduer';

const reducers = combineReducers({
   user: userReducer,
   category: categoryReducer,
   updateCat: categoryUpdateReducer,
   deleteCat: categoryDeleteReducer
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
