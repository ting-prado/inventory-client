import axios from "axios";

const BASE_URL = `${window.location.origin}/api`;

const fetchClient = () => {
	const client = axios.create({
		baseURL: BASE_URL,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Content-Type": "application/json"
		}
	});

	return client;
};

export default fetchClient;
