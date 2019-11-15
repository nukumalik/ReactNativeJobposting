const initState = {
	isLoading: false,
	isError: false,
	data: [],
}

const job = (state = initState, action) => {
	switch (action.type) {
		case 'ALL_JOB_PENDING':
			return {
				isLoading: true,
			}
		case 'ALL_JOB_REJECTED':
			return {
				isLoading: false,
				isError: true,
			}
		case 'ALL_JOB_FULFILLED':
			return {
				isLoading: false,
				isError: false,
				data: action.payload.data.data,
			}
		case 'ADD_JOB_PENDING':
			return {
				...state,
				isLoading: true,
			}
		case 'ADD_JOB_REJECTED':
			return {
				...state,
				isLoading: false,
				isError: true,
			}
		case 'ADD_JOB_FULFILLED':
			return {
				...state,
				isLoading: false,
				isError: false,
				data: [...state.data, action.payload.data.data],
			}
		case 'UPDATE_JOB_PENDING':
			return {
				...state,
				isLoading: true,
			}
		case 'UPDATE_JOB_REJECTED':
			return {
				...state,
				isLoading: false,
				isError: true,
			}
		case 'UPDATE_JOB_FULFILLED':
			return {
				...state,
				isLoading: false,
				isError: false,
				data: state.data.map(i =>
					i.id === action.id ? action.payload.data.data : i,
				),
			}
		case 'DELETE_JOB_PENDING':
			return {
				...state,
				isLoading: true,
			}
		case 'DELETE_JOB_REJECTED':
			return {
				...state,
				isLoading: false,
				isError: true,
			}
		case 'DELETE_JOB_FULFILLED':
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

export default job
