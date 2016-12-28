const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes');
const app = express();

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get(routes.webhook.url, routes.webhook.get.handler);
app.post(routes.webhook.url, routes.webhook.post.handler);

app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
});
