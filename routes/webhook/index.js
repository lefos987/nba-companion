const webhookService = require('./services');
const WEBHOOK_VERIFY_TOKEN = require('../../config').WEBHOOK_VERIFY_TOKEN;

function getWebhook(req, res) {
	console.log('Validating webhook...');
	const query = req.query;
	if (query['hub.mode'] === 'subscribe' && query['hub.verify_token'] === WEBHOOK_VERIFY_TOKEN) {
		console.log('Webhook validated!');
		res.status(200).send(query['hub.challenge']);
	} else {
		console.error('Failed validation. Make sure the validation tokens match.');
		res.sendStatus(403);
	}
}

function postWebhook(req, res) {
	const data = req.body;
	if (data.object !== 'page') {
		res.status(400).send('Update is not from a page object');
	} else {
		data.entry.forEach((entry) => {
			const pageId = entry.id;
			const timeOfUpdate = entry.time;
			console.log(`Webhook received update from page: ${pageId} at ${timeOfUpdate}`);

			entry.messaging.forEach((event) => {
				if (event.message) {
					webhookService.receivedMessage(event);
				} else {
					res.status(400).send(`Webhook received unknown event: ${event}`);
				}
			});
		});
		res.sendStatus(200);
	}
}

module.exports = {
	getWebhook,
	postWebhook
};