const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const PAGE_ACCESS_TOKEN = process.env.NBA_COMPANION_PAGE_ACCESS_TOKEN;
const WEBHOOK_VERIFY_TOKEN = process.env.NBA_COMPANION_WEBHOOK_VERIFY_TOKEN;

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send({ niki: 'volou' });
});

app.get('/webhook', (req, res) => {
	const query = req.query;
	if (query['hub.mode'] === 'subscribe' && query['hub.verify_token'] === WEBHOOK_VERIFY_TOKEN) {
		console.log('Validating webhook...');
		res.status(200).send(query['hub.challenge']);
	} else {
		console.error('Failed validation. Make sure the validation tokens match.');
		res.sendStatus(403);
	}
});

app.post('/webhook', function (req, res) {
	var data = req.body;
	console.log('data', data);
	// Make sure this is a page subscription
	// if (data.object == 'page') {
	// 	// Iterate over each entry
	// 	// There may be multiple if batched
	// 	data.entry.forEach(function(pageEntry) {
	// 		var pageID = pageEntry.id;
	// 		var timeOfEvent = pageEntry.time;
	//
	// 		// Iterate over each messaging event
	// 		pageEntry.messaging.forEach(function(messagingEvent) {
	// 			if (messagingEvent.optin) {
	// 				receivedAuthentication(messagingEvent);
	// 			} else if (messagingEvent.message) {
	// 				receivedMessage(messagingEvent);
	// 			} else if (messagingEvent.delivery) {
	// 				receivedDeliveryConfirmation(messagingEvent);
	// 			} else if (messagingEvent.postback) {
	// 				receivedPostback(messagingEvent);
	// 			} else if (messagingEvent.read) {
	// 				receivedMessageRead(messagingEvent);
	// 			} else if (messagingEvent.account_linking) {
	// 				receivedAccountLink(messagingEvent);
	// 			} else {
	// 				console.log("Webhook received unknown messagingEvent: ", messagingEvent);
	// 			}
	// 		});
	// 	});
	//
	// 	// Assume all went well.
	// 	//
	// 	// You must send back a 200, within 20 seconds, to let us know you've
	// 	// successfully received the callback. Otherwise, the request will time out.
	// 	res.sendStatus(200);
	// }
	res.sendStatus(200);
});

app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
});
