const PAGE_ACCESS_TOKEN = process.env.NBA_COMPANION_PAGE_ACCESS_TOKEN;
const WEBHOOK_VERIFY_TOKEN = process.env.NBA_COMPANION_WEBHOOK_VERIFY_TOKEN;

const GRAPH_API = {
	domain: 'https://graph.facebook.com',
	version: 'v2.8',
	endpoints: {
		messages: '/me/messages'
	}
};
module.exports = {
	PAGE_ACCESS_TOKEN,
	WEBHOOK_VERIFY_TOKEN,
	GRAPH_API
};