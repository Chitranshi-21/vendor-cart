import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import {
  productListReducer,productDetailsReducer,productSaveReducer
} from './reducers/productReducers';
import {
  userSigninReducer,
  userRegisterReducer,
} from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducers';

const userInfo = Cookie.getJSON("userInfo") || null;
const initialState = {userSignin: {userInfo}};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  productSave: productSaveReducer,
  cart: cartReducer 
});
 const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer, initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
