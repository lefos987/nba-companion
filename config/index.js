const PAGE_ACCESS_TOKEN = process.env.NBA_COMPANION_PAGE_ACCESS_TOKEN;
const WEBHOOK_VERIFY_TOKEN = process.env.NBA_COMPANION_WEBHOOK_VERIFY_TOKEN;
const STATS_ACCESS_TOKEN = process.env.NBA_COMPANION_XML_STATS_ACCESS_TOKEN;
const STATS_USER_AGENT = process.env.NBA_COMPANION_XML_STATS_USER_AGENT;
const LEAGUE_PASS_URL = 'https://watch.nba.com/game';

module.exports = {
	PAGE_ACCESS_TOKEN,
	WEBHOOK_VERIFY_TOKEN,
	STATS_ACCESS_TOKEN,
	STATS_USER_AGENT,
	LEAGUE_PASS_URL
};