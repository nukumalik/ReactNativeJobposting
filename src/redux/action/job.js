import axios from 'axios'

const URI = 'https://jobfindout.online/api/v1/jobs/'

export const allJob = (name, company, limit, orderby) => {
	let query
	if (name || company || limit || orderby) {
		query = axios.get(
			URI +
				`?name=${name}&company=${company}&limit=${limit}&orderby=${orderby}`,
		)
	} else {
		query = axios.get(URI + '?limit=10&orderby=updated_at')
	}
	return {
		type: 'ALL_JOB',
		payload: query,
	}
}

export const addJob = data => {
	return {
		type: 'ADD_JOB',
		payload: axios.post(URI, data),
	}
}

export const updateJob = (id, data) => {
	return {
		type: 'UPDATE_JOB',
		id,
		payload: axios.patch(URI + id, data),
	}
}

export const deleteJob = id => {
	return {
		type: 'DELETE_JOB',
		id,
		payload: axios.delete(URI + id),
	}
}
