const request = require('request');
const STATS_ACCESS_TOKEN = require('../../config').STATS_ACCESS_TOKEN;
const STATS_USER_AGENT = require('../../config').STATS_USER_AGENT;

const XML_STATS_API = {
	domain: 'https://erikberg.com/',
	endpoints: {
		events: 'events.json'
	}
};

function getDefaultRequestOptions(endpoint) {
	return {
		uri: `${XML_STATS_API.domain}${endpoint}`,
		method: 'GET',
		headers: {
			'Authorization': `Bearer ${STATS_ACCESS_TOKEN}`,
			'User-Agent': STATS_USER_AGENT
		}
	}
}

function callXmlStatsApi(endpoint, options) {
	return new Promise((resolve, reject) => {
		request(Object.assign({}, getDefaultRequestOptions(endpoint), options), (error, response, body) => {
			if(!error && response.statusCode === 200) {
				resolve(body);
			} else {
				console.log('XML STATS API RESPONSE', response);
				reject(error);
			}
		});
	});
}

module.exports = {
	callXmlStatsApi,
	endpoints: XML_STATS_API.endpoints
};