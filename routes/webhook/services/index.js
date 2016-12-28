const graphApi = require('../../../common/graph-api');
const events = require('../../../events');
const LEAGUE_PASS_URL = require('../../../config').LEAGUE_PASS_URL;

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
		events.getEvents()
			.then((events) => {
				return new Promise((resolve) => {
					const elements = events
						.filter((event, index) => index < 4)
						.map((event, index) => {
							const awayTeam = event.metadata.awayTeam.toUpperCase();
							const homeTeam = event.metadata.homeTeam.toUpperCase();
							const leaguePassUrl = `${LEAGUE_PASS_URL}/${event.date}/${awayTeam}${homeTeam}`;

							const defaultElement = {
								title: event.title,
								subtitle: 'kokoko',
								default_action: {
									type: 'web_url',
									url: leaguePassUrl,
									webview_height_ratio: 'full'
								},
								buttons: [
									{
										title: 'Watch Now',
										type: 'web_url',
										url: leaguePassUrl,
										webview_height_ratio: 'full'
									}
								]
							};

							if (index === 0) {
								return Object.assign({}, defaultElement, {
									image_url: 'https://www.photojoiner.net/image/aZYIuN5S'
								});
							}

							return defaultElement;
						});
					resolve(elements);
				});
			})
			.then((elements) => {
				sendButtonMessage(senderID, elements);
			});
		// sendTextMessage(senderID, messageText);

	}
}

function sendButtonMessage(recipientId, elements) {
	const messageData = {
		recipient:{
			id: recipientId
		},
		message:{
			attachment:{
				type: 'template',
				payload:{
					template_type: 'list',
					elements
				}
			}
		}
	};

	return graphApi.callSendAPI(messageData)
		.then((body) => {
			const recipientId = body.recipient_id;
			const messageId = body.message_id;

			console.log('Successfully sent button template message with id %s to recipient %s',
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