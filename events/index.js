const xmlStatsApi = require('../common/xml-stats');
const eventsService = require('./services');

function getEvents() {
	const options = {
		method: 'GET',
		qs: {
			date: eventsService.getYesterday(),
			sport: 'nba'
		}
	};

	return xmlStatsApi.callXmlStatsApi(xmlStatsApi.endpoints.events, options)
		.then((body) => {
			const data = JSON.parse(body);

			return data.event.map((event) => {
				return eventsService.getEvent(event);
			});
		}, (err) => {
			console.log('Error retrieving NBA events', err);
			return err;
		});
}

module.exports = {
	getEvents
};