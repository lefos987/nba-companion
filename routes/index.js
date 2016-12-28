const webhookHandler = require('./webhook');

module.exports = {
	webhook: {
		url: '/webhook',
		get: {
			handler: webhookHandler.getWebhook
		},
		post: {
			handler: webhookHandler.postWebhook
		}
	}
};