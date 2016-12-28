const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes');
const app = express();
const gm = require('gm').subClass({imageMagick: true});

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/lefos', function (req, res, next) {
	console.log('kokoko');
	gm('./public/img/pjimage.jpg')
		.resize(240, 240)
		.noProfile()
		.write('./public/img/resize1.png', function (err) {
			if (!err) {
				console.log('done');
				res.sendStatus(200);
			}
		});
});
app.get(routes.webhook.url, routes.webhook.get.handler);
app.post(routes.webhook.url, routes.webhook.post.handler);

app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
});