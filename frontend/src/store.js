import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'; //reducers
import { userReducer } from './Redux/reducer/user-reduer';
import {
   categoryReducer,
   categoryUpdateReducer,
   categoryDeleteReducer,
   subcategoryReducer,
   subcategoryUpdateReducer,
   subcategoryDeleteReducer
} from './Redux/reducer/category-reducer';
import {
   brandsReducer,
   brandsUpdateReducer,
   brandsDeleteReducer
} from './Redux/reducer/brands-reducer';

const reducers = combineReducers({
   user: userReducer,
   category: categoryReducer,
   updateCat: categoryUpdateReducer,
   deleteCat: categoryDeleteReducer,
   subcategory: subcategoryReducer,
   updateSubCat: subcategoryUpdateReducer,
   deleteSubCat: subcategoryDeleteReducer,
   brands: brandsReducer,
   updateBrands: brandsUpdateReducer,
   deleteBrands: brandsDeleteReducer
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
