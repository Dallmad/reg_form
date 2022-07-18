import axios from 'axios'

export const instance = axios.create({
	baseURL: 'https://smtp-server-dallmad.herokuapp.com/'
})