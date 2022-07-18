import {useDispatch} from 'react-redux'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk'
import {RegistrationActionsType, registrationReducer} from './registration-reducer'

const rootReducer = combineReducers({
	registration: registrationReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export const useTypedDispatch = () => useDispatch<TypedDispatch>()

//types
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppActionType = RegistrationActionsType
export type TypedDispatch = ThunkDispatch<AppRootStateType, any, AppActionType>

// @ts-ignore
window.store = store;