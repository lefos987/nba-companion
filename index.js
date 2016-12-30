const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes');
const app = express();
const gm = require('gm').subClass({imageMagick: true});

const LOGOS_DIR = require('./config').LOGOS_DIR;
const EVENTS_IMG_DIR = require('./config').EVENTS_IMG_DIR;
const DOMAIN = require('./config').DOMAIN;

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/lefos', (req, res, next) => {
	const awayTeamId = req.query.away;
	const homeTeamId = req.query.home;
	const awayLogo = `${LOGOS_DIR}/${awayTeamId}.png`;
	const homeLogo = `${LOGOS_DIR}/${homeTeamId}.png`;

	gm(awayLogo)
		.append(homeLogo)
		.append(true)
		.background('#fff')
		.resize(42, 42)
		.write(`${EVENTS_IMG_DIR}/${awayTeamId}_at_${homeTeamId}.png`, (err) => {
			if (err) {
				console.log('KOKOKOKOKOKOKOKOKOKOKKO', err);
				res.sendStatus(500);
			} else {
				const eventsImgDir = EVENTS_IMG_DIR.split('public/')[1];
				console.log('koko', `${DOMAIN}/${eventsImgDir}/${awayTeamId}_at_${homeTeamId}.png`);
				res.sendStatus(200);
			}
		});
});

app.get(routes.webhook.url, routes.webhook.get.handler);
app.post(routes.webhook.url, routes.webhook.post.handler);

app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
});