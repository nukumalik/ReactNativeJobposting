import axios from 'axios'

const URI = 'http://localhost:5000/api/v1/companies/'

export const allCompany = () => {
	return {
		type: 'ALL_COMPANY',
		payload: axios.get(URI),
	}
}

export const getCompany = id => {
	return {
		type: 'GET_COMPANY',
		id,
	}
}

export const addCompany = data => {
	return {
		type: 'ADD_COMPANY',
		payload: axios.post(URI, data),
	}
}

export const updateCompany = (id, data) => {
	return {
		type: 'UPDATE_COMPANY',
		id,
		payload: axios.patch(URI + id, data),
	}
}

export const deleteCompany = id => {
	return {
		type: 'DELETE_COMPANY',
		id,
		payload: axios.delete(URI + id),
	}
}
