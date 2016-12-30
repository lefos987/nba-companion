const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes');
const app = express();
const gm = require('gm').subClass({imageMagick: true});

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/lefos', function (req, res, next) {
	gm('./public/img/IND.png')
		.append('./public/img/WAS.png')
		.append(true)
		.background('#fff')
		.resize(42, 42)
		.write('./public/img/append.png', function (err) {
			if (err) return console.dir(arguments);
			console.log(this.outname + " created  ::  " + arguments[3]);
			require('child_process').exec('open ' + './public/img/append.png')
		});

});
app.get(routes.webhook.url, routes.webhook.get.handler);
app.post(routes.webhook.url, routes.webhook.post.handler);

app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
});