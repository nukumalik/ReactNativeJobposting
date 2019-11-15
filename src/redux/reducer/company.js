const initState = {
	isLoading: false,
	isError: false,
	data: [],
}

const company = (state = initState, action) => {
	switch (action.type) {
		case 'ALL_COMPANY_PENDING':
			return {
				isLoading: true,
			}
		case 'ALL_COMPANY_REJECTED':
			return {
				isLoading: false,
				isError: true,
			}
		case 'ALL_COMPANY_FULFILLED':
			return {
				isLoading: false,
				isError: false,
				data: action.payload.data.data,
			}
		case 'ADD_COMPANY_PENDING':
			return {
				...state,
				isLoading: true,
			}
		case 'ADD_COMPANY_REJECTED':
			return {
				...state,
				isLoading: false,
				isError: true,
			}
		case 'ADD_COMPANY_FULFILLED':
			return {
				...state,
				isLoading: false,
				isError: false,
				data: [...state.data, action.payload.data.data],
			}
		case 'UPDATE_COMPANY_PENDING':
			return {
				...state,
				isLoading: true,
			}
		case 'UPDATE_COMPANY_REJECTED':
			return {
				...state,
				isLoading: false,
				isError: true,
			}
		case 'UPDATE_COMPANY_FULFILLED':
			return {
				...state,
				isLoading: false,
				isError: false,
				data: state.data.map(i =>
					i.id === action.id ? action.payload.data.data : i,
				),
			}
		case 'DELETE_COMPANY_PENDING':
			return {
				...state,
				isLoading: true,
			}
		case 'DELETE_COMPANY_REJECTED':
			return {
				...state,
				isLoading: false,
				isError: true,
			}
		case 'DELETE_COMPANY_FULFILLED':
			return {
				...state,
				isLoading: false,
				isError: false,
				data: state.data.filter(i => i.id !== action.id),
			}
		default:
			return state
	}
}

export default company
