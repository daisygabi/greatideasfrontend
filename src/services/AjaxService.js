import * as axios from "axios";
import {AjaxException} from "./AjaxException";

const _parseResponse = response => {
	if (response !== undefined) {
		if (response.status === 200) {
			return response.data;
		}
		// if there is no content from server allow flow to notify user of no data
		if (response.status === 204) {
			return null;
		}
		throw new AjaxException(response);
	}
};

const BASE_URL = `http://localhost:8080/api/v1`;

const API_CLIENT = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	}
});

class AjaxService {
	async post(url, data) {
		const response = await this.getAuthorizedAPIClient().post(url, data)
			.catch(error => {
				console.error(error.message);
			});
		return _parseResponse(response);
	}

	async get(url) {
		const response = await this.getAuthorizedAPIClient().get(url)
			.catch(error => {
				console.error(error.message);
			});
		return _parseResponse(response);
	}

	getAuthorizedAPIClient() {
		return API_CLIENT;
	}
}

export default AjaxService;