import { SET_TIMES, DELETE_TIME } from './actionTypes';
import api from '../api';

const setTimes = (times) => ({
	type: SET_TIMES,
	times,
});

export const fetchTimes = () => {
	return (dispatch) => {
		api.times
			.fetchAll()
			.then((res) => dispatch(setTimes(res)))
			.catch((err) => console.log(err));
	};
};
export const createItem = (item) => {
	return (dispatch) => {
		api.times
			.create(item)
			.then((res) => dispatch(fetchTimes()))
			.catch((err) => console.log(err));
	};
};

export const deleteItem = (id) => {
	return (dispatch) => {
		api.times
			.delete(id)
			.then((res) => dispatch(fetchTimes()))
			.catch((err) => console.log(err));
	};
};
