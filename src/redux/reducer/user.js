import AsyncStorage from '@react-native-community/async-storage'

const initState = {
	isLoading: false,
	isError: false,
	token: '',
}

const user = (state = initState, action) => {
	switch (action.type) {
		case 'LOGIN_USER_PENDING':
			return {
				isLoading: true,
			}
		case 'LOGIN_USER_REJECTED':
			return {
				isLoading: false,
				isError: true,
			}
		case 'LOGIN_USER_FULFILLED':
			AsyncStorage.setItem('Authorization', action.payload.data.token)
			console.log(AsyncStorage.getItem('Authorization'))
			return {
				isLoading: false,
				isError: false,
				token: action.payload.data.token,
			}
		case 'REGISTER_USER_PENDING':
			return {
				isLoading: true,
			}
		case 'REGISTER_USER_REJECTED':
			return {
				isLoading: false,
				isError: true,
			}
		case 'REGISTER_USER_FULFILLED':
			return {
				isLoading: false,
				isError: false,
			}
		default:
			return state
	}
}

export default user
