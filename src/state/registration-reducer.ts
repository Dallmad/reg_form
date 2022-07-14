import {Dispatch} from 'redux'
import {api} from '../api/api'
import {handleServerNetworkError} from '../utils/Error/error';

const REGISTRATION = 'REGISTRATION'
const SET_SUCCESS = 'SET_SUCCESS'
const SET_ERROR = 'SET-ERROR'
const LOADING = 'LOADING'

const initialState = {
	isRegistration: false,
	isLoading: false,
	//isSuccess: false,
	error: '',
}
export const registrationReducer = (state: InitialStateType = initialState, action: RegistrationActionsType): InitialStateType => {
	switch (action.type) {
		case REGISTRATION:
			return {...state, isRegistration: true}
		case LOADING:
			return {...state, isLoading: action.isLoading}
		/*case SET_SUCCESS:
			return {...state, isSuccess: action.isSuccess}*/
		case SET_ERROR:
			return {...state, error: action.error}
		default:
			return state
	}
}
// actions
export const registration = () => ({type: REGISTRATION} as const)
export const loading = (isLoading: boolean) => ({type: LOADING, isLoading} as const)
export const successAC = (isSuccess: boolean) => ({type: SET_SUCCESS, isSuccess} as const)
export const setError = (error: string) => ({type: SET_ERROR, error} as const)

// thunks
export const createUserTC = (user: UserType) => async (dispatch: Dispatch) => {
	try {
		dispatch(loading(true))
		await api.createUsers(user)
		dispatch(registration())
		//dispatch(successAC(true))
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
	//| ReturnType<typeof successAC>
	| setErrorActionType

export type UserType = {
	id: string
	firstName: string
	lastName: string
	email: string
	nationality: string
	birthDate: string
	gender: string
	password: string
}