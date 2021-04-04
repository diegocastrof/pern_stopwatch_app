import axios from 'axios';

const apiUrl = `http://localhost:8000/api`;

export default {
	times: {
		create: (time) => axios.post(apiUrl + '/times', time).then((res) => res),
		delete: (id) => axios.delete(apiUrl + `/times/${id}`).then((res) => res),
		fetchAll: () => axios.get(apiUrl + '/times').then((res) => res),
	},
};
