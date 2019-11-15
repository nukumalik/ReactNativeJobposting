const initState = {
	isLoading: false,
	isError: false,
	data: [],
}

const category = (state = initState, action) => {
	switch (action.type) {
		case 'ALL_CATEGORY_PENDING':
			return {
				isLoading: true,
			}
		case 'ALL_CATEGORY_REJECTED':
			return {
				isLoading: false,
				isError: true,
			}
		case 'ALL_CATEGORY_FULFILLED':
			return {
				isLoading: false,
				isError: false,
				data: action.payload.data,
			}
		default:
			return state
	}
}

export default category
