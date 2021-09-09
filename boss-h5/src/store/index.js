import { createStore,applyMiddleware,compose } from "redux"
import { userReducer } from "../reducer"
import thunk from 'redux-thunk'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const userStore = createStore(userReducer,composeEnhancers(applyMiddleware(thunk)))
export default userStore