import axios from 'axios'

const URI = 'https://jobfindout.online/api/v1/categories'

export const allCategory = () => {
	return {
		type: 'ALL_CATEGORY',
		payload: axios.get(URI),
	}
}
