const request = require('request');
const GRAPH_API = require('../../config').GRAPH_API;
const PAGE_ACCESS_TOKEN = require('../../config').PAGE_ACCESS_TOKEN;

function constructUrl(endpoint) {
	return `${GRAPH_API.domain}/${GRAPH_API.version}${endpoint}`;
}

function callSendAPI(messageData) {
	const uri = constructUrl(GRAPH_API.endpoints.messages);
	return new Promise((resolve, reject) => {
		request({
			uri,
			qs: { access_token: PAGE_ACCESS_TOKEN },
			method: 'POST',
			json: messageData
		}, (error, response, body) => {
			if (!error && response.statusCode === 200) {
				resolve(body);
			} else {
				console.log('GRAPH API RESPONSE',response);
				reject(error);
			}
		});
	});
}

module.exports = {
	callSendAPI
};