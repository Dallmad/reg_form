import {instance} from './instance'
import {UserType} from '../state/registration-reducer'

export const api = {
	createUsers(data: UserType) {
		return instance.post('createUser', data)
	}
}