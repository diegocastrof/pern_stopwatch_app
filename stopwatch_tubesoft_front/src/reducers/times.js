import { SET_TIMES, DELETE_TIME } from '../actions/actionTypes';

export default function (state = [], action) {
	const times = JSON.parse(localStorage.getItem('times')) || [];
	switch (action.type) {
		case SET_TIMES:
			return action.times;

		case DELETE_TIME:
			const newTimes = times.filter((time) => time.id !== action.id);
			localStorage.setItem('times', JSON.stringify(newTimes));
			return newTimes;

		default:
			return state;
	}
}
