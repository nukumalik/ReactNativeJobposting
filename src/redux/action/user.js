import axios from 'axios'

const URI = 'http://localhost:5000/api/v1/users/'

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
