import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer";
import userReducer from "./reducers/userReducer";



let rootReducer = combineReducers({ auth: authReducer, user: userReducer })

let store = createStore(rootReducer, applyMiddleware(thunk))

export default store