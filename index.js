const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send({ niki: 'volou' });
});

app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
});
