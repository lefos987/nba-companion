const request = require('request');
const PAGE_ACCESS_TOKEN = require('../../config').PAGE_ACCESS_TOKEN;

const GRAPH_API = {
	domain: 'https://graph.facebook.com/',
	version: 'v2.8',
	endpoints: {
		messages: '/me/messages'
	}
};


function constructUrl(endpoint) {
	return `${GRAPH_API.domain}${GRAPH_API.version}${endpoint}`;
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
				console.log('GRAPH API RESPONSE', body);
				reject(error);
			}
		});
	});
}

module.exports = {
	callSendAPI
};