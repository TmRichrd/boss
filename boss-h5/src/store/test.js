import { createStore, compose, applyMiddleware } from "redux"
import { testReducer } from "../reducer/test"
import thunk from 'redux-thunk'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const testStore = createStore(testReducer, composeEnhancers(applyMiddleware(thunk)))
export default testStore