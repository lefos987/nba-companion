function getYesterday() {
	const today = new Date();
	const yesterday = new Date(today.setDate(today.getDate() - 1));
	const year = yesterday.getFullYear();
	const month = `00${yesterday.getMonth() + 1}`.slice(-2);
	const date = `00${yesterday.getDate()}`.slice(-2);

	return `${year}${month}${date}`;
}

function getEvent(event) {
	return {
		title: getTeamNamesFromEvent(event),
		date: getYesterday(),
		metadata: {
			awayTeam: getTeamId(event['away_team']),
			homeTeam: getTeamId(event['home_team'])
		}
	}
}
function getTeamNamesFromEvent(event) {
	const awayTeam = getTeamName(event['away_team']);
	const homeTeam = getTeamName(event['home_team']);

	return `${awayTeam} at ${homeTeam}`;
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