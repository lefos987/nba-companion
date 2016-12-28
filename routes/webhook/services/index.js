const request = require('request');
const GRAPH_API = require('../../../config').GRAPH_API;
const PAGE_ACCESS_TOKEN = require('../../../config').PAGE_ACCESS_TOKEN;

function receivedMessage(event) {
	const senderID = event.sender.id;
	const recipientID = event.recipient.id;
	const timeOfMessage = event.timestamp;
	const message = event.message;

	console.log('Received message for user %d and page %d at %d with message:',
		senderID, recipientID, timeOfMessage);
	console.log(JSON.stringify(message));

	const messageText = message.text;

	if (messageText) {
		// If we receive a text message, check to see if it matches a keyword
		// and send back the example. Otherwise, just echo the text we received.
		sendTextMessage(senderID, messageText);
	}
}

function sendTextMessage(recipientId, messageText) {
	const messageData = {
		recipient: {
			id: recipientId
		},
		message: {
			text: messageText
		}
	};

	callSendAPI(messageData);
}

function callSendAPI(messageData) {
	const uri = `${GRAPH_API.domain}/${GRAPH_API.version}${GRAPH_API.endpoints.messages}`;
	request({
		uri,
		qs: { access_token: PAGE_ACCESS_TOKEN },
		method: 'POST',
		json: messageData
	}, (error, response, body) => {
		if (!error && response.statusCode === 200) {
			const recipientId = body.recipient_id;
			const messageId = body.message_id;

			console.log("Successfully sent generic message with id %s to recipient %s",
				messageId, recipientId);
		} else {
			console.error("Unable to send message.");
			console.error(response);
			console.error(error);
		}
	});
}

module.exports = {
	receivedMessage
};