const graphApi = require('../../../common/graph-api');

function receivedMessage(event) {
	const senderID = event.sender.id;
	const recipientID = event.recipient.id;
	const timeOfMessage = event.timestamp;
	const message = event.message;
	const messageText = message.text;

	console.log('Received message for user %d and page %d at %d with message:',
		senderID, recipientID, timeOfMessage);
	console.log(JSON.stringify(message));

	if (messageText) {
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

	return graphApi.callSendAPI(messageData)
		.then((body) => {
			const recipientId = body.recipient_id;
			const messageId = body.message_id;

			console.log('Successfully sent generic message with id %s to recipient %s',
				messageId, recipientId);

			return {
				recipientId,
				messageId
			};
		}, (error) => {
			console.error('Unable to send message.');
			console.error(error);

			return error;
		});
}

module.exports = {
	receivedMessage
};