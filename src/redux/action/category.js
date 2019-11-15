import axios from 'axios'

const URI = 'http://localhost:5000/api/v1/categories'

export const allCategory = () => {
	return {
		type: 'ALL_CATEGORY',
		payload: axios.get(URI),
	}
}
