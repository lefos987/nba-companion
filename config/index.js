const PAGE_ACCESS_TOKEN = process.env.NBA_COMPANION_PAGE_ACCESS_TOKEN;
const WEBHOOK_VERIFY_TOKEN = process.env.NBA_COMPANION_WEBHOOK_VERIFY_TOKEN;
const STATS_ACCESS_TOKEN = process.env.NBA_COMPANION_XML_STATS_ACCESS_TOKEN;
const STATS_USER_AGENT = process.env.NBA_COMPANION_XML_STATS_USER_AGENT;
const LEAGUE_PASS_URL = 'https://watch.nba.com/game';
const LOGOS_DIR = 'public/img/logos';
const EVENTS_IMG_DIR = 'public/img/events';

const DOMAIN = (process.env.NBA_COMPANION_PROD) ?
	'https://fierce-scrubland-90150.herokuapp.com' :
	'http://localhost:5000';

module.exports = {
	PAGE_ACCESS_TOKEN,
	WEBHOOK_VERIFY_TOKEN,
	STATS_ACCESS_TOKEN,
	STATS_USER_AGENT,
	LEAGUE_PASS_URL,
	LOGOS_DIR,
	EVENTS_IMG_DIR,
	DOMAIN
};