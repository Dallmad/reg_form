import {Dispatch} from 'redux'
import {api} from '../api/api'
import {handleServerNetworkError} from '../utils/Error/error';

const REGISTRATION = 'REGISTRATION'
const SET_ERROR = 'SET-ERROR'
const LOADING = 'LOADING'

const initialState = {
	isRegistration: false,
	isLoading: false,
	error: '',
}
export const registrationReducer = (state: InitialStateType = initialState, action: RegistrationActionsType): InitialStateType => {
	switch (action.type) {
		case REGISTRATION:
			return {...state, isRegistration: true}
		case LOADING:
			return {...state, isLoading: action.isLoading}
		case SET_ERROR:
			return {...state, error: action.error}
		default:
			return state
	}
}
// actions
export const registration = () => ({type: REGISTRATION} as const)
export const loading = (isLoading: boolean) => ({type: LOADING, isLoading} as const)
export const setError = (error: string) => ({type: SET_ERROR, error} as const)

// thunks
export const createUserTC = (user: UserType) => async (dispatch: Dispatch) => {
	try {
		dispatch(loading(true))
		await api.createUsers(user)
		dispatch(registration())
	} catch (error) {
		if (error instanceof Error) {
			handleServerNetworkError(error.message, dispatch)
		}
	} finally {
		dispatch(loading(false))
	}
}

// types
type InitialStateType = typeof initialState
export type setErrorActionType = ReturnType<typeof setError>

export type RegistrationActionsType =
	ReturnType<typeof registration>
	| ReturnType<typeof loading>
	| setErrorActionType

export type UserType = {
	id: string
	firstName: string
	lastName: string
	email: string
	nationality: string
	birthDate: string
	password: string
}