const gm = require('gm').subClass({imageMagick: true});
const LOGOS_DIR = require('../../config').LOGOS_DIR;
const EVENTS_IMG_DIR = require('../../config').EVENTS_IMG_DIR;
const DOMAIN = require('../../config').DOMAIN;

function getYesterday() {
	const today = new Date();
	const yesterday = new Date(today.setDate(today.getDate() - 1));
	const year = yesterday.getFullYear();
	const month = `00${yesterday.getMonth() + 1}`.slice(-2);
	const date = `00${yesterday.getDate()}`.slice(-2);

	return `${year}${month}${date}`;
}

function getEvent(event) {
	const promises = [
		getEventTitle(event),
		getEventImageUri(event),
		getEventMetadata(event)
	];

	return Promise.all(promises)
		.then(values => ({
			title: values[0],
			imageUri: values[1],
			date: getYesterday(),
			metadata: values[2]
		}));
}

function getEventImageUri(event) {
	const awayTeamId = getTeamId(event['away_team']).toUpperCase();
	const homeTeamId = getTeamId(event['home_team']).toUpperCase();
	const awayLogo = `${LOGOS_DIR}/${awayTeamId}.png`;
	const homeLogo = `${LOGOS_DIR}/${homeTeamId}.png`;

	return new Promise((resolve, reject) => {
		gm(awayLogo)
			.append(homeLogo)
			.append(true)
			.background('#fff')
			.resize(42, 42)
			.write(`${EVENTS_IMG_DIR}/${awayTeamId}_at_${homeTeamId}.png`, (err) => {
				if (err) {
					console.log('Error creating event image: ', err);
					reject(err);
				} else {
					const eventsImgDir = EVENTS_IMG_DIR.split('public/')[1];
					resolve(`${DOMAIN}/${eventsImgDir}/${awayTeamId}_at_${homeTeamId}.png`);
				}
			});

	});
}

function getEventMetadata(event) {
	return {
		awayTeam: getTeamId(event['away_team']),
		homeTeam: getTeamId(event['home_team']),
	};
}

function getEventTitle(event) {
	return new Promise((resolve) => {
		const awayTeam = getTeamName(event['away_team']);
		const homeTeam = getTeamName(event['home_team']);
		resolve(`${awayTeam} at ${homeTeam}`);
	});
}

function getTeamName(team) {
	return `${team['first_name']} ${team['last_name']}`;
}

function getTeamId(team) {
	return team.abbreviation;
}


module.exports = {
	getYesterday,
	getEvent
};