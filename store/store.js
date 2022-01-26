import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../store/reducers'

const initialState = {}

export const store =  createStore(
        rootReducer, 
        initialState,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    )
