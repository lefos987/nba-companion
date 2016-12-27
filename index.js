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

app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
});
