import axios from 'axios'

const URI = 'https://jobfindout.online/api/v1/users/'

export const loginUser = data => {
	return {
		type: 'LOGIN_USER',
		payload: axios.post(URI + 'login', data),
	}
}

export const registerUser = data => {
	return {
		type: 'REGISTER_USER',
		payload: axios.post(URI + 'register', data),
	}
}
